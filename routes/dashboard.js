const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/authGuard')
const dashBController = require('../controllers/dashboard')
const postController = require('../controllers/postF')
const upload = require("../middleware/multer");


router.get('/', ensureAuth, dashBController.gotoDashboard)
router.get('/post', ensureAuth, postController.gotopost )
router.get('/myPost', ensureAuth, postController.myPosts )

router.post('/createPost', ensureAuth, upload.single("file"), postController.MakePost )

module.exports = router;

// {/* <span>Author Name: <%= posts[i].authorName %></span><br></br> */}