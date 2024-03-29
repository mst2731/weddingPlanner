const router = require('express').Router()
const venueController = require('../controllers/venueController')
const authController = require('../controllers/authController')

// get all venues and create a venue
router.route('/')
    .get(venueController.getAllVenues)
    .post(authController.protect, venueController.createVenue)

// get a venue, update a venue, delete a venue
router.route('/:id')
    .get(venueController.getVenue)
    .patch(authController.protect, venueController.updateVenue)
    .delete(authController.protect, venueController.deleteVenue)

// get venues by city
router.route('/city/:city')
    .get(venueController.getVenuesByCityOrType)

// get venues by type
router.route('/type/:type')
    .get(venueController.getVenuesByCityOrType)

module.exports = router