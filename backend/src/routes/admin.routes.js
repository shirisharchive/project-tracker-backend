const upload = require('../../utils/upload.multer');
const adminAUTH = require('../controllers/admin.auth');
const bannerCTRL = require('../controllers/banner.auth');
const noticeCTRL = require('../controllers/notice.auth');
const projectCTRL = require('../controllers/project.status.auth');



const adminRouter=require('express').Router();



//for projects
adminRouter.post("/addProject",projectCTRL.validateProject);
adminRouter.get("/completedProject",projectCTRL.getCompletedProjects);
adminRouter.get("/ongoingProject",projectCTRL.getOngoingProjects);
adminRouter.delete("/deleteProject/:id",projectCTRL.deleteProject)
adminRouter.put("/updateProject/:id",projectCTRL.updateProject)


//for authentication and authorization

adminRouter.post("/register",adminAUTH.register)
adminRouter.post("/login",adminAUTH.login)
adminRouter.post("/verify",adminAUTH.verifyOtp)



//for notices


adminRouter.post("/post-notice",upload.single("image"),noticeCTRL.postNotice)
adminRouter.get("/get-notice",upload.single("image"),noticeCTRL.getNotice)
adminRouter.delete("/delete-notice",noticeCTRL.deleteNotice)
adminRouter.put("/update-notice/:id",noticeCTRL.updateNotice)



//for banners
adminRouter.post("/post-banner",upload.array("image",5),bannerCTRL.postBanner)
adminRouter.get("/get-banner",bannerCTRL.getBanner)
adminRouter.delete("/delete-banner/:id",bannerCTRL.deleteBanner)

module.exports=adminRouter;