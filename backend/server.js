require("dotenv").config()
const express=require('express');
const app=express();

const router = require("./src/routes");

const connectDB = require("./src/model/connectDB");

app.use(express.json())


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


//mongoconnection.
 connectDB();
 
//making server that listen on port no 3000
app.listen (3000,'localhost',(error)=>{
    try{
    if(!error){

        console.log("Server is on ");
        
        
    }
    else{
        console.log("Error encountered",error)
    }
}
catch(error){
    throw(error)
}

})