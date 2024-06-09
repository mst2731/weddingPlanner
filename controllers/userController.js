const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./mongooseFactory')

exports.updateMe = catchAsync(async (req, res, next) => {
    // create error if password data is posted
    if (req.body.password || req.body.passwordConfirm) return next(new AppError("please use /updateMyPassword route to update password", 403))
    // update user data
    // fiilter the user data, don't allow user to add roles, resetPasswordToken ....
    const filteredData = filterData(req.body, 'name', 'email')

    // as we are not updating any passwords here, running validators while saving is not necessary
    // so instead if .save, we can directly use update
    await User.findByIdAndUpdate(req.user.id, filteredData)

    res.status(204).json({
        status: 'success',
        data: {

        }
    })
})

exports.addToFavourites = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) return next(new AppError('user not found', 404))

    if (!req.body.onModel || !req.body.favouriteId) return next(new AppError('FavouriteId and onModel fields are required', 400))

    const favouriteData = {
        onModel: req.body.onModel,
        _id: req.body.favouriteId
    }

    if (!user.favourites.some(fav => fav._id)) {
        user.favourites.push(favouriteData)
        await user.save()
    }
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.user.id)
    res.status(200).json({
      status: 'success',
      data: {
      }  
    })  
  })

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id
    next()
}
exports.getUser = factory.getOne(User)