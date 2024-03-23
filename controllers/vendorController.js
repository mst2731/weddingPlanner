const factory = require('./mongooseFactory')

exports.getAllVendors = (req, res, next) => {
    factory.getAll(req.model)(req, res, next)
}

exports.createVendor = (req, res, next) => {
    factory.createOne(req.model)(req, res, next)
}

exports.getVendor = (req, res, next) => {
    factory.getOne(req.model)(req, res, next)
}

exports.updateVendor = (req, res, next) => {
    factory.updateOne(req.model)(req, res, next)
}

exports.deleteVendor = (req, res, next) => {
    factory.deleteOne(req.model)(req, res, next)
}