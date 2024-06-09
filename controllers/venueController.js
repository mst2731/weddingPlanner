const Venue = require('../models/venue')
const factory = require('./mongooseFactory')

exports.getAllVenues = factory.getAll(Venue)
exports.getVenue = factory.getOne(Venue, { path: 'reviews', select: 'review rating user' })
exports.createVenue = factory.createOne(Venue)
exports.updateVenue = factory.updateOne(Venue)
exports.deleteVenue = factory.deleteOne(Venue)

exports.getVenuesByCityOrType = (req, res, next) => {
    const filter = {}
    if (req.params.city) filter.city = req.params.city
    if (req.params.type) filter.type = req.params.type
    req.query.filter = filter
    factory.getAll(Venue)(req, res, next)
}