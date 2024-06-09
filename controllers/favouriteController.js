const factory = require('./mongooseFactory')
const Favourite = require('../models/favourite')

// exports.getAllFavourites = factory.getAll(Favourite, (req) => ({ userId: req.user.id }))
exports.getAllFavourites = (req, res, next) => {
    req.query.filter = { userId: req.user.id }; // Add filter to the request query
    req.query.fields = 'onModel,favVendorId'; // Add fields to the request query
    factory.getAll(Favourite)(req, res, next);
};
exports.createFavourite = factory.createOne(Favourite)
exports.deleteFavourite = factory.deleteOne(Favourite)