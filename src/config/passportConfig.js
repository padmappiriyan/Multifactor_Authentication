import passport from 'passport';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from "passport-local";

const passportConfig = ()=>{
    passport.use(new LocalStrategy(

  async(username, password, done)=> {
    try{
      const user =await User.findOne({username});
      if(!user){
        return done(null,false,{message:"Incorrect username or password"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return done(null,false,{message:"Incorrect username or password"});
        }
        return done(null,user);
    }
    catch(error){
        return done(error);
    }
   
  }
));
}

passport.serializeUser((user,done)=>{
    console.log("We are in serializeUser");
    done(null,user._id);
});

passport.deserializeUser(async(_id,done)=>{      
    
    try{
        console.log("We are in deserializeUser");
        const user = await User.findById(_id);
        done(null,user);              
    }
    catch(error){
        done(error);
    }

});
export default passportConfig;