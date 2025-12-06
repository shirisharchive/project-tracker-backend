const express=require("express");
const connectDB = require("../src/model/connectDB");
const app=express()


//making server that listen on port no 3000
const StartServer=async()=>{
    try{
        app.listen(3000,'localhost',(error)=>{
            if(!error){
                console.log("Server is on ");
        //mongoconnection.
        connectDB();
                
        }
        else{
            console.log("Error connecting the server",error);
            process.exit(1)
        }

        })

    }
    catch(error)
    {
        throw(error)
    }
}

module.exports=StartServer;