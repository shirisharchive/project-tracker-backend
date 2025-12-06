const Joi=require('joi')
class bannerImage{

    bannerUpload=async(data)=>{
        try{
            let rules=Joi.object({
                image: Joi.string().required().allow(null, "")
            })

        }
        catch(error)
        {
            throw(error)
        }
    }
};
const bannerSVC=new bannerImage();
module.exports=bannerSVC;