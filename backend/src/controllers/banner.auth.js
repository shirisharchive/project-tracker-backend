const bannerSVC = require("../services/bannerImage.service");
const Banners=require("../model/bannerImage.model")

class bannerAUTH{

    postBanner=async(req,res,next)=>{
        try{
            let validatedData=await bannerSVC.bannerUpload({
                ...req.body,
                image:req.file ? req.file.path:null
            });

            const newBanner= new Banners(validatedData)
            const savedBanner= await newBanner.save()

            return res.status(201).json({
                message: "Banner Image Uploaded successfully",
                
            })
        }
            catch(error)
            {
                next(error)
            }
        }

        getBanner=async(req,res,next)=>{

            try{

                const getBannerImage=await Banners.find();
                return res.status(200).json({
                message: "Banner Images fetched successfully",
              
            });


            }
            catch(error)
            {
                next(error)
            }

        } 

         deleteBanner= async (req, res, next) => {
                try {
                    const id = req.params.id;
        
                    const bannerImage = await Banners.findByIdAndDelete(id);
        
                    if (!bannerImage) {
                        return res.status(404).json({ message: "Banner IMAGE not found" });
                    }
        
                    return res.status(200).json({
                        message: "Notice deleted successfully"
                    });
        
                } catch (error) {
                    next(error);
                }
            };
};
const bannerCTRL=new bannerAUTH()
module.exports=bannerCTRL;


