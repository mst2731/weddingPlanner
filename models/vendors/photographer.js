const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photographerSchema = new Schema({
    name :{
        type: String,
        required: [true, 'A photographer must have a name']
    },
    contactDetails:{
        phone: {
            type: String,
            required: [true, 'A photographer must have a phone number']
        },
        email: {
            type: String,
            required: [true, 'A photographer must have an email']
        },
        city: String,
        address: String,
    },
    ratings: {
        type: Number,
        default: 4.5
    },
    servicesOffered: [String], // wedding, pre-wedding, etc
    avgPrice: {
        type: Number,
        required: [true, 'A photographer must have an average price']
    },
    clientReviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Photographer = mongoose.model('Photographer', photographerSchema)
module.exports = Photographer