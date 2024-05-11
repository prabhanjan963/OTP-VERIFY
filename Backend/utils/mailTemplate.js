import nodemailer from "nodemailer";

export const sendEmail = (otp,email) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });

    const mailOptions = {
        from:process.env.EMAIL,
        to:email,
        subject:"OTP Verification",
        text:`Your OTP is: ${otp}`
    }

    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }
        else{
            console.log("Email sent successfully");
        }
    });

}