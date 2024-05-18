const User = require("../models/user");

async function handleSignup(req,res){
    const { fullname, email, password } = req.body;
    await User.create({
        fullname,
        email,
        password,
    })
    return res.redirect("/");
}

async function handleSignin(req,res){
    const { email,password } = req.body;
    const user = await User.matchPassword(email,password);

    console.log("User",user);

    return res.redirect("/");
}

module.exports={
    handleSignup,
    handleSignin,
}