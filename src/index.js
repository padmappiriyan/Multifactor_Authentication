import express, { json, urlencoded } from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js"
dotenv.config();

dbConnect();
const app=express();

const corOptions = {
    origin:["http://localhost:3001"],
    Credentials:true,
}
app.use(cors(corOptions));
app.use(session({
    secret:process.env.SESSION_SECRET || "secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:6000 * 60,
    }
}));

app.use(passport.initialize);
app.use(passport.session);

app.use("/api/auth",authRoutes);

//built-in middlewares

app.use(json({
    limit:"100mb",
    
}))

app.use(urlencoded({
    limit:"100mb",
    extened:true
}))

const PORT = process.env.PORT || 7003

app.listen(PORT,()=>{
    console.log(`Sever is running on port ${PORT}`);
})
