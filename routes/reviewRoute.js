const router = require('express').Router()
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')
const Review = require('../models/review')

router.use(authController.protect)

router.route('/')
    .post(reviewController.createReview)

router.route('/:id')
    .get(reviewController.getReview)
    .patch(authController.checkUserOwnership(Review), reviewController.updateReview)
    .delete(authController.checkUserOwnership(Review), reviewController.deleteReview)

module.exports = router