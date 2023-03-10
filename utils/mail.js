const nodemailer=require('nodemailer');


exports.generateOTP = (otp_length = 6) => {
    let OTP = "";
    for (let i = 1; i <= otp_length; i++) {
      const randomVal = Math.round(Math.random() * 9);
      OTP += randomVal;
    }
  
    return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: 'dramalitebot@gmail.com',
      pass: process.env.GOOGLE_APP_CODE,
    },
});
