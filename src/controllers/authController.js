import userModel from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async(req,res)=>{
        try{
            const {username,password}= req.body;
            if(!username || !password){
                return res.status(400).json({
                    success:false,
                    message:"Please provide username and password"
                });
            }
            //check if user already exists
            const existingUser = await userModel.findOne({username});
            if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:"User already exists"
                });
            }
            //create new user
            const hasshedPassword =  bcrypt.hashSync(password,10);
            const newUser = await userModel.create({
                username,
                password:hasshedPassword,
                isMfaActivate:false,
              });
                return res.status(201).json({       
                    success:true,
                    message:"User registered successfully",
              });
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Server error"});

        }
}


export const login = async(req,res)=>{

}


export const  authStatus= async(req,res)=>{

}


export const logout = async(req,res)=>{

}


export const setup2FA =async (req,res)=>{

}


export const verify2FA = async(req,res)=>{

}


export const  reset2FA= async(req,res)=>{

}


