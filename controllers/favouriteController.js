const factory = require('./mongooseFactory')
const Favourite = require('../models/favourite')

exports.getAllFavourites = factory.getAll(Favourite)
exports.createFavourite = factory.createOne(Favourite)
exports.deleteFavourite = factory.deleteOne(Favourite)