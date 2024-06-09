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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A food caterer must be associated with a user']
    },
    ratings: {
        type: Number,
        default: 4.5
    },
    cuisine: [String], // Indian, Chinese, etc
    experienceYears: Number,
    avgPricesPerPlate: [
        {   
            _id: false,
            cuisine: String,
            price: Number
        }
    ]
},
{
    id: false
})

// add virtual populate
foodCaterSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'onModelId',
    localField: '_id',
    justOne: false,
    match: { onModel: 'FoodCater' }
})

foodCaterSchema.set('toObject', { virtuals: true })
foodCaterSchema.set('toJSON', { virtuals: true })

const FoodCater = mongoose.model('FoodCater', foodCaterSchema)
module.exports = FoodCater