const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    review: {
        type: String,
        required: [true, 'A review must have a review']
    },
    rating: {
        type: Number,
        required: [true, 'A review must have a rating']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A review must have a user']
    },
    onModelId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A review must have a model id'],
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Venue', 'Pandit', 'Decor', 'Photographer', 'FoodCater', 'Makeup'] // list of your models
    }
})

// populate user
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next()
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review