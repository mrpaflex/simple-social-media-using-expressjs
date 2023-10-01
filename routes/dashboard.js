const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/authGuard');
const dashBController = require('../controllers/dashboard');
const postController = require('../controllers/postF')
const upload = require("../middleware/multer");


router.get('/', ensureAuth, dashBController.gotoDashboard)
router.get('/myPost', ensureAuth, postController.myPosts )
//uploading
router.post('/createPost', ensureAuth, upload.single("file"), postController.MakePost )
//going to posting route
router.get('/post', ensureAuth, postController.gotopost )

//here is for delete
router.delete('/deletePost/:id', ensureAuth,  postController.deletePost)

module.exports = router;