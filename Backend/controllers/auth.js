import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../utils/mailTemplate.js";
import jwt from 'jsonwebtoken'

export const signup = async (req,res) => {
    const { name,email,password } = req.body;
    try {
        if(!name ||!email ||!password) return res.status(400).json({error: "Please fill all details"});
        if(!email.includes('@')) return res.status(400).json({error: "Invalid Email"});

        const hashedpassword = bcryptjs.hashSync(password,10);
        const otp = Math.floor(100000+Math.random()*900000);
        const newUser = await User({...req.body, password:hashedpassword,otp:otp});

        // otp
        sendEmail(otp,email);
        await newUser.save();
        res.status(201).json({success:"Please enter your otp which you have received in mail"});
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const verifyEmail = async (req,res) => {
    const { otp,email } = req.body;
    try {
        if(!otp) return res.status(400).json({error: "Invalid OTP"});
        
        const otpVerify = await User.findOne({email});

        if(otpVerify.otp === otp) {
            const token = jwt.sign({id:otpVerify._id},process.env.JWT_SECRET)
            return res.cookie('access_token',token,process.env.JWT_SECRET).json({success: "Login successful"})
        }

    } catch (error) {
        return res.status(400).json({error: "Invalid OTP"})
    }
}

export const signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        if(!email ||!password) return res.status(400).json({error: 'Fill all details'})
        if(!email.includes('@')) return res.status(400).json({error: 'Enter Valid Email!'})

        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error:"User Not Found!"})

        //email work

        const isVerifieDProfile = await User.findById(user._id);

        if(isVerifieDProfile.isVerified){
            const isCorrect = bcryptjs.compareSync(password, user.password)
            if(!isCorrect) return res.status(404).json({error:"Wrong Credentials!"})
    
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            const { password:hashedPassword,...rest } = user._doc;
    
            res.cookie('access_token',token,process.env.JWT_SECRET).status(200).json(rest)
        }else{
            res.status(400).json({error: "Please Verify Email"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}