 import React from 'react'
 import { useState } from 'react';
 import { verify2FA,reset2FA } from '../service/authApi.js';
 
 const TwoFAVerification = ({onVerifySuccess,onRestSuccess}) => {
    const [OTP,setOtp]=useState("");
    const [error,setError]=useState("");

    const handleTokenVerfication= async(e)=>{
        e.preventDefault();
        try{
            const {data}=await verify2FA(OTP);
            onVerifySuccess(data);

        }
        catch(error){
            setOtp("");
            console.log(error.message);
            setError("InValid OTP. please try again");
        }
    }
    const handleReset= async()=>{
        try{
            const {data}=await reset2FA();
            onRestSuccess(data);
        }
        catch(error){
           
            setError(error.message || "Error in resetting 2FA, please try again");
            console.log(error.message);
        }
    }
   return (
      <form
      className="bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto p-6 space-y-6"
      onSubmit={handleTokenVerfication}
    >
      
      <div>
        <h2 className="text-3xl text-center font-light text-gray-800">
            Validate TOTP
        </h2>
        <p className="text-center text-gray-500 text-base mt-2">
          Please enter the 6-digit code from your authenticator app to complete the login process.
        </p>
      </div>

      <div>
        <label
          htmlFor="TOTP"
          className="block text-sm font-medium text-gray-600"
        >
          TOTP
        </label>
        <input
          type="text"
          id="TOTP"
          placeholder="Enter your TOTP"
          value={OTP}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      
      

      
        {error && (     
        <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md">
            {error}         
        </div>
        )}
       

      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Verify TOTP
      </button>
      
      
      <button
        type="button"
        className="w-full bg-slate-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
     
        onClick={handleReset}>
        Reset 2FA
      </button>
     
      
    </form>
   )
 }
 
 export default TwoFAVerification