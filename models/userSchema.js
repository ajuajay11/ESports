const mongoose = require("mongoose")

const userSchema = new mongoose.userSchema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        unique:true,
        index:true,
        required:true
    }
})

const User = mongoose.model("user", userSchema)
module.exports = User;