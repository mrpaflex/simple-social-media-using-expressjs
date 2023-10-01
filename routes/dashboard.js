const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/authGuard');
const dashBController = require('../controllers/dashboard');



router.get('/', ensureAuth, dashBController.gotoDashboard)


module.exports = router;