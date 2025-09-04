import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

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
    console.log("We are in login controller",req.user);
    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        username:req.user.username,
        isMfaActivate:req.user.isMfaActivate
    });

}


export const  authStatus= async(req,res)=>{
    console.log(req.user);

    if(req.user){
        res.status(200).json({
            message:"User logged in successfully",
            username:req.user.username,
            isMfaActivate:req.user.isMfaActivate
        })
    }
    else{
        res.status(401).json({
            message:"Unauthorized user"
        })
    }

}


export const logout = async(req,res)=>{
     if(!req.user){
        return res.status(400).json({       
            success:false,
             message:"Unauthorized user"
     })
    }
     req.logout((err)=>{
        if(err){
            return res.status(500).json({
                success:false,
                message:"User not logged in"
            })
        }
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })   
});
}

export const setup2FA =async (req,res)=>{
      try{
           console.log("The request user is ",req.user);
           const user= req.user;
           var secret=speakeasy.generateSecret();
           console.log("The secret generated is ",secret);
           user.twoFactorSecret= secret.base32;
           user.isMfaActivate=true;
           await user.save();
           const url= speakeasy.otpauthURL({
            secret:secret.base32,
            label:`MFA-Demo(${req.user.username})`,
            issuer:"www.piriyan.com",
            encoding:"base32"
      })
      //pass this url to qrcode so that it can genrate qrcode image
     const qrImageurl=await qrCode.toDataURL(url);
     res.status(200).json({
        success:true,
        message:"2FA is successfully activated",
        qrCode:qrImageurl,
        secret:secret.base32
    })
}
      catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in setting up 2FA"});
      }
}


export const verify2FA = async(req,res)=>{
    const {token} = req.query;
    const user = req.user;
    const verified= speakeasy.totp.verify({
        secret:user.twoFactorSecret,
        encoding:"base32",
        token,
})
if(verified){
   const jwtToken=jwt.sign({
    username:user.username
   },process.env.JWT_SECRET,{expiresIn:"1h"});

    return res.status(200).json({   
        success:true,
        message:"2FA verification is successful",
        token:jwtToken
})
}
else{
    return res.status(400).json({   
        success:false,
        message:"Invalid token"
})
}

}

export const  reset2FA= async(req,res)=>{
          try{
            const user = req.user;
            user.isMfaActivate=false;
            user.twoFactorSecret="";
            await user.save();
            res.status(200).json({
                success:true,
                message:"2FA is successfully reset, please setup again"
            })
          }
          catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Error in resetting 2FA"});
          }
}


