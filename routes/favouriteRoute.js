const router = require('express').Router()
const Favourite = require('../models/favourite')
const favouriteController = require('../controllers/favouriteController')
const authController = require('../controllers/authController')

router.route('/')
    .get(authController.protect, favouriteController.getAllFavourites)
    .post(authController.protect, favouriteController.createFavourite)

router.route('/:id')
    .delete(authController.protect, authController.checkUserOwnership(Favourite), favouriteController.deleteFavourite)

module.exports = router