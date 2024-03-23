const router = require('express').Router()
const venueController = require('../controllers/venueController')

// get all venues and create a venue
router.route('/')
    .post(venueController.createVenue)

// get a venue, update a venue, delete a venue
router.route('/:id')
    .get(venueController.getVenue)
    .patch(venueController.updateVenue)
    .delete(venueController.deleteVenue)

// get venues by city
router.route('/city/:city')
    .get(venueController.getVenuesByCity)

// get venues by type
router.route('/type/:type')
    .get(venueController.getVenuesByType)

module.exports = router