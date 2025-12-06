const mongoose=require("mongoose")

const bannerSchema=new mongoose.Schema({
     image: {
        type: String, // store path or URL
        default: null
    },
    

});
module.exports=mongoose.model("Banners",bannerSchema)