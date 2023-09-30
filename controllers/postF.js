const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
    gotopost: (req, res)=>{
        res.render('post')
    },

    myPosts: async (req, res)=>{
        try {
            const myPosts = await Post.find({userId: req.user.id}).sort({ createdAt: "desc" }).lean();
        if (!myPosts || myPosts.length === 0) {
            console.log('You haven\'t made any posts yet');
          }
                 res.render('myposts', {posts: myPosts, user: req.user});
                
        } catch (error) {
            console.error(error);
        }
    },

    MakePost: async (req, res)=>{
     try {
        const {authorName, title, post} = req.body;

        const result = await cloudinary.uploader.upload(req.file.path)
    
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
    },

    likePosts: async (req, res)=>{
        try {
            await Post.findByIdAndUpdate(
                { _id: req.params.id},
                {
                    $inc: {likes: 1}
                }
                );
                res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    },

    deletePost: async (req, res)=>{
        try {
            const getPost = await Post.findById({_id: req.params.id});
            await cloudinary.uploader.destroy(getPost.cloudinaryId);
            await Post.deleteOne(getPost)
            console.log('post deleted')
            //await Post.remove({ _id: req.params.id });
            res.redirect('/dashboard')

        } catch (error) {
            console.log(error)
        }
    }
}