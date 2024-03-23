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
    }
})

const Pandit = mongoose.model('Pandit', panditSchema)
module.exports = Pandit