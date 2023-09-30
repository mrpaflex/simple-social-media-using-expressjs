const mongoose = require('mongoose')

//create user table
const PostSchema = new mongoose.Schema({
   title: {
        type: String, 
        required: true},
    post: {
        type: String, 
        required: true},
    likes: {
        type: Number, 
        required: true},

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
    // userId: {
    //     type: String, 
    //     required: true},
        
    image: String, 

    cloudinaryId: String,
        
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('post', PostSchema)