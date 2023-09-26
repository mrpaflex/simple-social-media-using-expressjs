const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
    gotopost: (req, res)=>{
        res.render('post')
    },
    MakePost: async (req, res)=>{
     try {
        const {authorName, title, post} = req.body;

        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result)

        await Post.create({
            authorName: authorName,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            title: title,
            likes: 0,
            post: post,
            userId: req.user.id

        })
        console.log('post added')
        res.redirect('/dashboard')
     } catch (error) {
        console.log(error)
     }
    }
}