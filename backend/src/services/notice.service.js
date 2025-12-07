const Joi=require("joi")

class NoticeValidation{
    uploadNotice=async(data)=>{
        try{
            let rules=Joi.object({
                title: Joi.string().min(3).max(200).required(),
                description: Joi.string().min(5).required(),
                image: Joi.string().optional().allow(null, "")


            })

           return await  rules.validateAsync(data)

        }
        catch(error){
            throw(error)
        }
    }

}
const noticeSVC=new NoticeValidation();
module.exports=noticeSVC;