const bcrypt=require('bcrypt')
const AdminData = require('../model/admin.model');
const sendOtpEmail=require("../../utils/sendOTP");
const adminSVC = require('../services/admin.auth.service');

class AdminAuthentication {

    // ------------------- REGISTER ADMIN -------------------
   register = async (req, res, next) => {
    try {
        console.log("Req body:", req.body);

        const validatedData = await adminSVC.registerAdmin(req.body);

        if (!validatedData) {
            return res.status(400).json({
                success: false,
                message: "Invalid request data"
            });
        }

        validatedData.isInitialAdmin = true;

        const existingAdmin = await AdminData.findOne();
        if (existingAdmin) {
            return res.status(403).json({
                success: false,
                message: "Only the first admin can be registered."
            });
        }

        const newAdmin = new AdminData(validatedData);
        const savedAdmin = await newAdmin.save();

        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data: savedAdmin
        });

    } catch (error) {
        next(error);
    }
};


    // ------------------- LOGIN ADMIN -------------------


   login = async (req, res, next) => {
    try {
        let {email}= await adminSVC.loginAdmin(req.body);


        const admin = await AdminData.findOne({ email });
        if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });


        // otp is generated here
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        //otp is to be hashed and saved to db because it is statefull session

        // admin.otp = otp;->this method save string of otp

        const saltRounds=10;
        const hashedOTP=await bcrypt.hash(otp,saltRounds);
        admin.otp=hashedOTP;
        admin.otpExpires = Date.now() + 1 * 60 * 1000;
        await admin.save();

        // ✅ Send OTP via email
        await sendOtpEmail(email, otp);

        res.status(200).json({
            success: true,
            message: "OTP sent to your email."
        });

    } catch (error) {
        next(error);
    }
}


    // ------------------- VERIFY OTP -------------------
    verifyOtp = async (req, res, next) => {
        try {
            const { email, otp } = await adminSVC.verifyOtpAdmin(req.body);

            const admin = await AdminData.findOne({ email });
            if (!admin) return res.status(404).json({ message: "Admin not found" });


//Comparing otp with hashed value of otp
            const isMatched=  bcrypt.compare(otp,admin.otp)
            if(!isMatched){
                return res.status(400).json({ message: "Invalid OTP" });
            }
            

            if (Date.now() > admin.otpExpires) return res.status(400).json({ message: "OTP expired" });

            //clear otp after verification
            admin.otp = null;
            admin.otpExpires = null;
            await admin.save();

            res.status(200).json({ success: true, message: "OTP verified successfully" });

        } catch (error) {
            next(error);
        }
    }

}

const adminAUTH = new AdminAuthentication()
module.exports = adminAUTH;
