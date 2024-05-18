const express = require("express");
const app = express();
const path = require("path");

const PORT = 8000;

//template engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//route
app.get("/",(req,res)=>{
    return res.render("home");
})





app.listen(PORT,()=> console.log(`Server Started at : ${PORT}`));