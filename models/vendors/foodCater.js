const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodCaterSchema = new Schema({
    name :{
        type: String,
        required: [true, 'A food caterer must have a name']
    },
    contactDetails:{
        phone: {
            type: String,
            required: [true, 'A food caterer must have a phone number']
        },
        email: {
            type: String,
            required: [true, 'A food caterer must have an email']
        },
        city: String
    },
    ratings: {
        type: Number,
        default: 4.5
    },
    cuisine: [String], // Indian, Chinese, etc
    experienceYears: Number,
    avgPricesPerPlate: [
        {
            cuisine: String,
            price: Number
        }
    ],
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

const FoodCater = mongoose.model('FoodCater', foodCaterSchema)
module.exports = FoodCater