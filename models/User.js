const mongoose = require('mongoose')

//create user table
const UserSchema = new mongoose.Schema({
    username: String,

    email: String,
    
    password: String,
    
    gender: String,
    
    address: String,

    dob:  String,

    phone: Number
})

module.exports = mongoose.model('user', UserSchema)