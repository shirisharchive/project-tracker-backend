require("dotenv").config();
const nodemailer = require('nodemailer');

// 1. Create transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,    // your email
        pass: process.env.EMAIL_PASS     // app password if using Gmail
    }
});

// 2. Send OTP function
const sendOtpEmail = async (toEmail, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: 'Your Admin OTP',
            text: `Your OTP for admin login is: ${otp}. It will expire in 1 minutes.`
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${toEmail}`);
    } catch (error) {
        console.error(`Failed to send OTP to ${toEmail}:`, error);
        throw new Error("Failed to send OTP email");
    }
};

// 3. Export the function
module.exports = sendOtpEmail;
