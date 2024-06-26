const mongoose = require('mongoose')
const Schema = mongoose.Schema

const panditSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A pandit must have a name']
    },
    contactDetails: {
        phone: {
            type: String,
            required: [true, 'A pandit must have a phone number']
        },
        email: {
            type: String,
            required: [true, 'A pandit must have an email']
        },
        city: String
    },
    servicesOffered: [String], // marriage, housewarming, etc
    languages: [String],
    experienceYears: Number,
    ratings: {
        type: Number,
        default: 4.5
    },
    feesCharged: {
        baseFee: Number,
        additionalFeePerHour: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A food caterer must be associated with a user']
    }
},
{
    id: false
})

// add virtual populate
panditSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'onModelId',
    localField: '_id',
    justOne: false,
    match: { onModel: 'Pandit' }
})

panditSchema.set('toObject', { virtuals: true })
panditSchema.set('toJSON', { virtuals: true })

const Pandit = mongoose.model('Pandit', panditSchema)
module.exports = Pandit