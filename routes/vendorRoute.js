const router = require('express').Router()
const Pandit = require('../models/vendors/pandit')
const Decor = require('../models/vendors/decor')
const FoodCater = require('../models/vendors/foodCater')
const Photographer = require('../models/vendors/photographer')
const Makeup = require('../models/vendors/makeup')
const vendorController = require('../controllers/vendorController')
const authController = require('../controllers/authController')

function setModel(req, res, next) {
    const vendorType = req.params.vendorType
    if (vendorType === 'photographer') {
        req.model = Photographer
    } else if (vendorType === 'makeup') {
        req.model = Makeup
    } else if (vendorType === 'pandit') {
        req.model = Pandit
    } else if (vendorType === 'decor') {
        req.model = Decor
    } else if (vendorType === 'foodCater') {
        req.model = FoodCater
    }
    else {
        return res.status(400).send('Invalid vendor type')
    }
    next()
}
// get all vendors and create a vendor
router.route('/:vendorType')
    .get(setModel, vendorController.getAllVendors)
    .post(setModel, authController.protect, authController.restrictTo('admin', 'vendor'), vendorController.createVendor)

// get a vendor, update a vendor, delete a vendor
router.route('/:vendorType/:id')
    .get(setModel, vendorController.getVendor)
    .patch(setModel, authController.protect, authController.checkUserOwnership(), vendorController.updateVendor)
    .delete(setModel, authController.protect, authController.checkUserOwnership(), vendorController.deleteVendor)

// sort by ratings

module.exports = router