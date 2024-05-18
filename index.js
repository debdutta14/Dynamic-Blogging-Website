const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const PORT = 8000;
//routes
const userRoute = require("./routes/user");

//DB Connection
mongoose.connect("mongodb://localhost:27017/BlogWebsite")
.then(()=>console.log("Database Connected!"));


//template engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.urlencoded({extended:false}));

//route
app.use("/users",userRoute);

app.get("/",(req,res)=>{
    return res.render("home");
})






app.listen(PORT,()=> console.log(`Server Started at : ${PORT}`));