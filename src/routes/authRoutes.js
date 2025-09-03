import express from "express";
import passport from "passport";
import { register,login,authStatus,logout,setup2FA,verify2FA,reset2FA } from "../controllers/authController.js";

const router = express.Router();

//Registration route
router.post("/register", register);

//Login Route
router.post("/login", login);

//Auth status route
router.post("/status", authStatus);

//Logout Route
router.post("/logout", logout);


//setup 2FA
router.post("/2fa/setup",setup2FA);
//2fa verify route
router.post("/2fa/verify",verify2FA);
//2fa reset
router.post("/2fa/reset",reset2FA);


export default router;

