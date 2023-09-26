const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/authGuard')
const dashBController = require('../controllers/dashboard')
const postController = require('../controllers/postF')
const upload = require("../middleware/multer");


router.get('/', ensureAuth, dashBController.gotoDashboard)
router.get('/post', ensureAuth, postController.gotopost )

router.post('/createPost', upload.single("file"), postController.MakePost )

module.exports = router;