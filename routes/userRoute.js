const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword',authController.forgotPassword)
router.patch('/resetPassword/:token',authController.resetPassword)

router.use(authController.protect)

router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMe', userController.updateMe)
router.patch('/deleteMe', userController.deleteMe)
router.patch('/updateMyPassword',authController.updatePassword)

module.exports = router