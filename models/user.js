const { Schema,model } = require("mongoose");

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:'./images/defaultProfile.png'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    },
},
{timestamps:true});

const User = model("user",userSchema);

module.exports = User;