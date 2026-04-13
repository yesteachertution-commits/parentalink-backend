const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

const sendOtpEmail = async(email, otp) => {
    try{
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code for Verification',
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return info;

    }catch(err){
        console.error("Error sending email:", err);
        throw err;
    }
}

module.exports = sendOtpEmail;