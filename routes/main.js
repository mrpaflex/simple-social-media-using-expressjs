const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const {ensureAuth} = require('../middleware/authGuard')
const postController = require('../controllers/postF')
const upload = require("../middleware/multer");

router.get('/', homeController.gethome)
router.get('/login', homeController.getlogin)
router.post('/login', authController.loginNow)
router.get('/signup', homeController.getSignup)
router.post('/signup', authController.signup)
router.get('/logout', authController.logout)

router.get('/myposts', ensureAuth, postController.myPosts )
//uploading
router.post('/createPost', ensureAuth, upload.single("file"), postController.MakePost )
//going to posting route
router.get('/post', ensureAuth, postController.gotopost )

//here is for delete
router.delete('/deletePost/:id', ensureAuth,  postController.deletePost)

//here is for like
router.put('/likePost/:id', ensureAuth,  postController.likePosts);




module.exports = router;