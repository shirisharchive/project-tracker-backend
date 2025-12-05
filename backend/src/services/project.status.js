const Joi=require('joi');

class ProjectStatus{

    addProject=async(data)=>{
        try{
    let rules=Joi.object({

        id:Joi.number().required(),



         title: Joi.string()
                    .min(3) 
                    .max(255)
                    .required()
                    .label('Project Title'),

                description: Joi.string()
                    .min(10) 
                    .required(),
                   

                // 'year' is used for either a single year (e.g., '2024') or a duration (e.g., '2023–2024')
                year: Joi.string()
                    .required(),

                 status: Joi.string()
                    .valid('ongoing', 'completed')
                    .lowercase()
                    .required()
                    

    })
    return await rules.validateAsync(data)
    
}
catch(error)
{
    throw(error)
}
};

}
const projectSVC=new ProjectStatus();
module.exports=projectSVC;