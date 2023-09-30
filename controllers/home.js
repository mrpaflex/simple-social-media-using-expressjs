
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {

    gethome: async (req, res)=>{
        try {
            const posts = await Post.find().sort({ createdAt: "desc" }).populate('userId').lean();
            res.render('index', { posts: posts});
      
          } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving posts: ' + error.message);
          }
        },

    getlogin: (req, res)=>{
        if(req.user){
           return  res.redirect('/dashboard')
        }
        res.render('login')
    },
    getSignup: (req, res)=>{
        if(req.user){
          return  res.redirect('/dashboard')
        }
        res.render('signup')
    }
}