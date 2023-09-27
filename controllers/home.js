
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
    gethome: async (req, res)=>{
        try {
            const posts = await Post.find().sort({ createdAt: "desc" }).lean();
            res.render('index', { posts: posts });
      
          } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving posts: ' + error.message);
          }
        },

    getlogin: (req, res)=>{
        res.render('login')
    },
    getSignup: (req, res)=>{
        res.render('signup')
    }
}