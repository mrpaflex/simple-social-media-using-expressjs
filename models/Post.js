const mongoose = require('mongoose')

//create user table
const PostSchema = new mongoose.Schema({
    authorName: {
        type: String, 
        require: true},
    title: {
        type: String, 
        require: true},
    post: {
        type: String, 
        require: true},
    likes: {
        type: Number, 
        require: true},
    userId: {
        type: String, 
        require: true},
        
    image: String, 

    cloudinaryId: String,
        
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('post', PostSchema)