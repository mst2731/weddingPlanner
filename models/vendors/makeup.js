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
    specialities: [String], // bridal, party, etc
    experienceYears: Number,
    productsUsed: [String], // List of brands
    clientReviews: [
        {
            clientName: String,
            review: String,
            rating: Number,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const Makeup = mongoose.model('Makeup', makeupSchema)
module.exports = Makeup