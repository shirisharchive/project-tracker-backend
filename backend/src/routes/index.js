const adminRouter = require('./admin.routes');

const router=require('express').Router();

router.use("/admin",adminRouter);



module.exports=router;