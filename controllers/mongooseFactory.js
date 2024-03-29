const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.deleteOne = (Model) => {
    return catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id)

        if (!doc) return next(new AppError('No doc found with that ID', 404))

        res.status(204).json({
            message: 'Deleted successfully'
        })
    })
}

exports.updateOne = (Model) => catchAsync(async (req, res, next) => {
    if (req.user) req.body.userId = req.user.id
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!doc) return next(new AppError('No doc found with that ID', 404))

    res.status(200).json({
        message: 'Updated successfully',
        data: {
            doc
        }
    })
})

exports.createOne = (Model) => {
    return catchAsync(async (req, res, next) => {
        if (req.user) req.body.userId = req.user.id
        const doc = await Model.create(req.body)
        res.status(201).json(doc)
    })
}

exports.getOne = (Model, popOps) => {
    return catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id)
        // if (popOps) query = query.populate(popOps).cache({ key: req.user?.id })
        if (popOps) query = query.populate(popOps)
        const doc = await query

        if (!doc) return next(new AppError('No doc found with that ID', 404))

        res.status(200).json(doc)
    })
}

exports.getAll = (Model) => {
    return catchAsync(async (req, res, next) => {
        let filter = {}
        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        // const docs = await features.query.explain().cache({key: req.user?.id})
        // to check how many docs are scanned & how many docs are returned
        const docs = await features.query
        res.status(200).json(docs)
    })
}