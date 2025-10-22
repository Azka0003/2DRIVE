const mongoose = require('mongoose')

// const userSchema=new mongoose.Schema({
//     username:String,
//     email:String,
//     password:String
// }) for beginner not for production level


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'USername must be atleast 3 characters long']
    },

    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'Email must be atleast 3 characters long']
    },

    password:{
         type: String,
        required: true,
        trim: true,
        // lowercase: true,
        minlength: [5, 'Password must be atleast 5 characters long']
    }
})

const users =mongoose.model('user',userSchema)

module.exports=users