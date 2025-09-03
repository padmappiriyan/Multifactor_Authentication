import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    isMfaActivate:{
        type:Boolean,
        required:false
    },
    twoFactorSecret:{
        type:String,

    }

},{
    timestamps:true
});

const userModel= mongoose.model("user",userSchema);

export default userModel;