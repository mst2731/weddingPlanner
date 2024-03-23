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
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A venue must have a price']
    },
    amenities: [String]
})

const Venue = mongoose.model('Venue', venueSchema)
module.exports = Venue