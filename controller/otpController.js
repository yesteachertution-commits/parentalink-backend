const sendOtpEmail = require('../services/mailService');
const User = require('../models/User')
const Otp = require('../models/OtpModal');

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists. Please log in." });
        }


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Optional: clear previous unverified OTPs
        await Otp.deleteMany({ email, used: false });

        const otpData = new Otp({
            email,
            otp,
            expiresAt,
            used: false // ✅ Fix: you must define this field
        });

        await otpData.save();

        // ✅ Actually send the email
        await sendOtpEmail(email, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error("Error sending OTP:", err);
        res.status(500).json({ message: "Failed to send OTP", error: err.message });
    }
};

// cerify otp

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        
        const otpData = await Otp.findOne({ email, otp, used: false });

        if (!otpData) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (otpData.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        otpData.used = true;
        await otpData.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error("Error verifying OTP:", err);
        res.status(500).json({ message: "Failed to verify OTP", error: err.message });
    }
};

module.exports = { sendOtp, verifyOtp };