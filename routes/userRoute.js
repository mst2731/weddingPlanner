const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword',authController.forgotPassword)
router.patch('/resetPassword/:token',authController.resetPassword)

router.get('/me',authController.protect, userController.getMe, userController.getUser)
module.exports = router