const env = require('dotenv');
const express = require("express")
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
env.config({path:"./config.env"})


const port = process.env.PORT || 4004;

require("./db/conn");
app.use(cookieParser());
app.use(require("./router/auth"));
app.use (require("./models/userSchema"));




app.get("/", (req,res)=>{
    res.send("home page");
})




app.listen(port, (req,res)=>{
    console.log(`listen to the port of ${port}`)
})