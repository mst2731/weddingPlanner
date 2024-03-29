const router = require('express').Router()
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

function setModel(req, res, next) {
    const type = req.params.type
    if (type === 'photographer') {
        req.model = Photographer
    } else if (type === 'makeup') {
        req.model = Makeup
    } else if (type === 'pandit') {
        req.model = Pandit
    } else if (type === 'decor') {
        req.model = Decor
    } else if (type === 'foodCater') {
        req.model = FoodCater
    } else if (type === 'venue') {
        req.model = Venue
    } else {
        return res.status(400).send('Invalid vendor type')
    }
    next()
}

router.use(authController.protect)

router.route('/')
    .post(reviewController.createReview)

router.route('/:id')
    .get(reviewController.getReview)
    .patch(setModel, reviewController.updateReview)
    .delete(setModel, reviewController.deleteReview)

module.exports = router