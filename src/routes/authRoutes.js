import express from "express";
import passport from "passport";
import { register,login,authStatus,logout,setup2FA,verify2FA,reset2FA } from "../controllers/authController.js";

const router = express.Router();

//Registration route
router.post("/register", register);

//Login Route
router.post("/login",passport.authenticate("local"), login);

//Auth status route
router.get("/status", authStatus);

//Logout Route
router.get("/logout", logout);


//setup 2FA
router.post("/2fa/setup",(req,res,next)=>{
   
    if(req.isAuthenticated()) return next();
    return res.status(401).json({
        success:false,
        message:"Unauthorized user"
    })
},setup2FA);


//2fa verify route
router.post("/2fa/verify",(req,res,next)=>{
    if(req.isAuthenticated()) return next();
    return res.status(401).json({
        success:false,
        message:"Unauthorized user"
    })
},verify2FA);



//2fa reset
router.post("/2fa/reset",(req,res,next)=>{
    if(req.isAuthenticated()) return next();
    return res.status(401).json({
        success:false,
        message:"Unauthorized user"
    })
},reset2FA);


export default router;

