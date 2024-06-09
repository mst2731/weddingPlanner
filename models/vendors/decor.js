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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A food caterer must be associated with a user']
    },
    servicesOffered: [String], // floral, lighting, etc
    experienceYears: Number,
    portfolio: [String], // List of image URLs
}, 
{
    id: false // to remove the virtual id from the response
})

// add virtual populate
decorSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'onModelId',
    localField: '_id',
    justOne: false,
    match: { onModel: 'Decor' }
})

decorSchema.set('toObject', { virtuals: true })
decorSchema.set('toJSON', { virtuals: true })

const Decor = mongoose.model('Decor', decorSchema)
module.exports = Decor