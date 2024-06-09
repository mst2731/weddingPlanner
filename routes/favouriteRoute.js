const router = require('express').Router()
const Favourite = require('../models/favourite')
const favouriteController = require('../controllers/favouriteController')
const authController = require('../controllers/authController')

router.use(authController.protect) // protect all routes after this middleware

router.route('/')
    .get(favouriteController.getAllFavourites)
    .post(favouriteController.createFavourite)

router.route('/:id')
    .delete(authController.checkUserOwnership(Favourite), favouriteController.deleteFavourite)

module.exports = router