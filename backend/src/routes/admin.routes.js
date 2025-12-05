const adminAUTH = require('../controllers/admin.auth');
const projectCTRL = require('../controllers/project.status.auth');

const adminRouter=require('express').Router();

adminRouter.post("/addProject",projectCTRL.validateProject);
adminRouter.get("/completedProject",projectCTRL.getCompletedProjects);
adminRouter.get("/ongoingProject",projectCTRL.getOngoingProjects);
adminRouter.delete("/deleteProject/:id",projectCTRL.deleteProject)
adminRouter.put("/updateProject/:id",projectCTRL.updateProject)




adminRouter.post("/register",adminAUTH.register)
adminRouter.post("/login",adminAUTH.login)
adminRouter.post("/verify",adminAUTH.verifyOtp)



module.exports=adminRouter;