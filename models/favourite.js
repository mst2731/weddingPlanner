const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favouriteSchema = new Schema({
    favVendorId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Venue', 'Pandit', 'Decor', 'Photographer', 'FoodCater', 'Makeup']
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Favourite = mongoose.model('Favourite', favouriteSchema)
module.exports = Favourite