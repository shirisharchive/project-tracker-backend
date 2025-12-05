const AdminData = require('../model/admin.model');

const sendOtpEmail=require("../../utils/sendOTP");
const adminSVC = require('../services/admin.auth.service');

class AdminAuthentication {

    // ------------------- REGISTER ADMIN -------------------
    register = async (req, res, next) => {
        try {
            // 1. Validate email format using Joi
            const validatedData = await adminSVC.registerAdmin(req.body);

            // 2. Check if a first admin already exists
            const existingAdmin = await AdminData.findOne();

            if (existingAdmin) {
                // ❌ Stop execution immediately for subsequent registrations
                return res.status(403).json({
                    success: false,
                    message: "Only the first admin can be registered. Further registrations are not allowed."
                });
            }

            // 3. Mark as first admin
            validatedData.isInitialAdmin = true;

            // 4. Save admin in DB
            const newAdmin = new AdminData(validatedData);
            const savedAdmin = await newAdmin.save();

            // 5. Respond with success
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
        const { email } = await adminSVC.loginAdmin(req.body);

        const admin = await AdminData.findOne({ email });
        if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        admin.otp = otp;
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
};


    // ------------------- VERIFY OTP -------------------
    verifyOtp = async (req, res, next) => {
        try {
            const { email, otp } = await adminSVC.verifyOtpAdmin(req.body);

            const admin = await AdminData.findOne({ email });
            if (!admin) return res.status(404).json({ message: "Admin not found" });

            if (admin.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

            if (Date.now() > admin.otpExpires) return res.status(400).json({ message: "OTP expired" });

            admin.otp = null;
            admin.otpExpires = null;
            await admin.save();

            res.status(200).json({ success: true, message: "OTP verified successfully" });

        } catch (error) {
            next(error);
        }
    };

}

const adminAUTH = new AdminAuthentication();
module.exports = adminAUTH;
