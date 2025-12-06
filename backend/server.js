require("dotenv").config()
const express=require('express');
const app=express();
const cors=require("cors")


const router = require("./src/routes");
const StartServer = require("./utils/startServer");

app.use(express.json())
app.use(cors()) //cross origin resource sharing
app.use(router)


//middleware for exception handling
app.use((err,req,res,next)=>{
    console.log("Error:",err.stack|| err);
    const statusCode=err.statusCode||err.code||500;
    res.status(statusCode).json({
        data:null,
        msg:err.msg||"Something went wrong",
        status:false,
        meta:null
    })
})

//start server
StartServer();