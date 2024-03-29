const mongoose  = require('mongoose')
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
    onModel:{
        type: String,
        enum: ['Venue', 'Decor', 'FoodCater', 'Photographer', 'Makeup', 'Pandit'],
        required: [true, 'A review must have a model']
    }
})

// populate user
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next()
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review