const mongoose = require('mongoose')
const Schema = mongoose.Schema

const makeupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A makeup artist must have a name']
    },
    contactDetails: {
        phone: {
            type: String,
            required: [true, 'A makeup artist must have a phone number']
        },
        email: {
            type: String,
            required: [true, 'A makeup artist must have an email']
        },
        city: String
    },
    ratings: {
        type: Number,
        default: 4.5
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A food caterer must be associated with a user']
    },
    specialities: [String], // bridal, party, etc
    experienceYears: Number,
    productsUsed: [String] // List of brands
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// add virtual populate
makeupSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'onModelId',
    localField: '_id'
})

const Makeup = mongoose.model('Makeup', makeupSchema)
module.exports = Makeup