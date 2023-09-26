const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')

router.get('/', homeController.gethome)
router.get('/login', homeController.getlogin)
router.post('/login', authController.loginNow)
router.get('/signup', homeController.getSignup)
router.post('/signup', authController.signup)



module.exports = router;