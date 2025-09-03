import { connect } from "mongoose"

const dbConnect = async()=>{
    try{
         const connectiondb= await connect(process.env.CONNECTION_STRING);
         console.log("Databse connection successfully");
    }
    catch(error){
      console.log(`databse connection is failde ${error}`);
    } 
   
}

export default dbConnect;