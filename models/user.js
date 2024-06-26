const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const res = require('express/lib/response')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    unique: [true, 'this email already registered'],
    lowercase: true, // email will be converted to lowercase
    required: [true, 'email is required'],
    validate: [validator.isEmail, 'email must be correct format']
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'], // vendor and admin can add services
    required: [true, 'role is required']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLength: [8, 'password length should be greater than 7'],
    maxLength: [20, 'password length should be less than 21'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'passwordConfirm is required'],
    minLength: [8, 'passwordConfirm length should be greater than 7'],
    maxLength: [20, 'passwordConfirm length should be less than 21'],
    validate: {
      //this validation works only on CREATE and SAVE!!!
      //validator is not called while updating....
      validator: function () {
        return this.password === this.passwordConfirm
      },
      message: 'password and passwordConfirm should be same'
    }
  },
  active: Boolean,
  changedPasswordAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

userSchema.pre('save', async function (next) {
  //only run this function when password field is modified
  if (!this.isModified('password')) return next()
  //hash the password with salt length 12
  this.password = await bcrypt.hash(this.password, 12)
  //delete passwordConfirm
  this.passwordConfirm = undefined

  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()
  this.changedPasswordAt = Date.now() - 1000
  next()
})

//method available for all documents(instances of user model)
//statics available for collections
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.changedPasswordAt) {
    const changedTimeStamp = parseInt(
      this.changedPasswordAt.getTime() / 1000,
      10
    )
    return changedTimeStamp > JWTTimeStamp
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  console.log('created reset password token')
  return resetToken
}

userSchema.pre(/^find/, function (next) {
  //this points to current query
  this.find({ active: { $ne: false } })
  next()
})

// populate favourites
userSchema.virtual('favourites', {
  ref: 'Favourite',
  foreignField: 'userId',
  localField: '_id'
})

const User = mongoose.model('User', userSchema)
module.exports = User