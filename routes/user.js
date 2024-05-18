const express = require("express");
const { handleSignup,handleSignin } = require("../controllers/user");
const router = express.Router();



router.get("/signin",(req,res)=>{
    return res.render("signin");
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.post("/signup",handleSignup);
router.post("/signin",handleSignin);

module.exports = router;