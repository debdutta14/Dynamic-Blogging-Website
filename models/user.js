const { Schema,model } = require("mongoose");
const {createHmac, randomBytes } = require("crypto");
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

userSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
    next();
})

//virtual function
userSchema.static("matchPassword", async function(email,password){
    const user = await User.findOne({ email });
    if(!user) throw new Error('User Not Found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const ProvidedPassword = createHmac("sha256",salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== ProvidedPassword) throw new Error("Password Not Matched!");
    return user;
})



const User = model("user",userSchema);

module.exports = User;