const mongoose = require('mongoose')
const Schema = mongoose.Schema

const venueSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A venue must have a name']
    },
    type: {
        type: String,
        enum: ['resort', '5star', 'conference', 'convention', 'banquet', 'destination-wedding'],
        required: [true, 'A venue must have a type']
    },
    maxCapacity: {
        type: Number,
        required: [true, 'A venue must have a maximum capacity']
    },
    contactDetails: {
        phone: {
            type: String,
            required: [true, 'A venue must have a phone number']
        },
        email: {
            type: String,
            required: [true, 'A venue must have an email']
        },
        city: {
            type: String,
            required: [true, 'A venue must have a city']
        },
        address: {
            type: String,
            required: [true, 'A venue must have an address']
        }
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A venue must have a price']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A food caterer must be associated with a user']
    },
    amenities: [String]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// add virtual populate
venueSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'onModelId',
    localField: '_id'
})

const Venue = mongoose.model('Venue', venueSchema)
module.exports = Venue