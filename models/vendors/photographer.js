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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A food caterer must be associated with a user']
    }
},
{
    id: false
})

// add virtual populate
photographerSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'onModelId',
    localField: '_id',
    justOne: false,
    match: { onModel: 'Photographer' }
})

photographerSchema.set('toObject', { virtuals: true })
photographerSchema.set('toJSON', { virtuals: true })

const Photographer = mongoose.model('Photographer', photographerSchema)
module.exports = Photographer