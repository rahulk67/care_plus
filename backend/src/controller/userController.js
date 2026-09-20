import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const userRegister = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if(!phone){
            return res.status(400).json({message:"Phone number is required"})
        }
        const user = await User.findOne({phone})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const NewUser = await User.create({name, email, password, phone})
        return res.status(201).json({message:"User created successfully", user:NewUser})
        
    } catch (error) {
        console.log(error);
    }
}

const userLogin = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if(!phone || !password){
            return res.status(400).json({message:"Phone number and password are required"})
        }
        const user = await User.findOne({phone})



        if(!user){
            return res.json({message:"User not found", success:false})
        }
        if(user.password !== password){
            return res.json({message:"Invalid password", success:false})
        }
        const jwtToken = jwt.sign({_id:user._id,phone:user.phone}, process.env.JWT_SECRET, {expiresIn: "1d"})

        return res.status(200).json({message:"User logged in successfully", user, jwtToken,success:true})
    } catch (error) {
        console.log(error);
    }
}

const doctorsList = async (req, res) => {
    try {
        const doctors = await Doctor.find({role: "doctor"})
        return res.status(200).json({doctors})
    } catch (error) {
        console.log(error);
    }
}

const doctorAdd = async (req,res) => {
    try {
        const { name, email, password, phone } = req.body;
        if(!phone){
            return res.status(400).json({message:"Phone number is required"})
        }
        const doctor = await Doctor.findOne({phone})
        const doctorEmail = await Doctor.findOne({email})
        if(doctor || doctorEmail){
            return res.status(400).json({message:"Doctor Email/Phone already exists"})
        }
        const NewDoctor = await Doctor.create({name, email, password, phone})
        return res.status(201).json({message:"Doctor created successfully", doctor:NewDoctor})
        
    } catch (error) {
        console.log(error);
    }
}



export {userRegister, userLogin,doctorsList,doctorAdd};