const mongoose = require('mongoose')
const Schema = mongoose.Schema

const decorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A decorator must have a name']
    },
    contactDetails: {
        phone: {
            type: String,
            required: [true, 'A decorator must have a phone number']
        },
        email: {
            type: String,
            required: [true, 'A decorator must have an email']
        },
        city: String
    },
    ratings: {
        averageRating: {
            type: Number,
            default: 0
        },
        numberOfRatings: {
            type: Number,
            default: 0
        }
    },
    servicesOffered: [String], // floral, lighting, etc
    experienceYears: Number,
    portfolio: [String], // List of image URLs
    clientReviews:[
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