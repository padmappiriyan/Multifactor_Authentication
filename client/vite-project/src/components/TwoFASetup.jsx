import React, { useEffect } from 'react';
import { useState } from 'react';
import { setup2FA } from '../service/authApi.js';


const TwoFASetup = ({onSetupComplete}) => {
    const [respose,setResponse]=useState({});
    const [message,setMessage]=useState("");
    const fetchQRCode= async()=>{
        const {data}=await setup2FA();
        setResponse(data);
        console.log(data);
    }
    useEffect(()=>{
        fetchQRCode();
    },[])
    const copyClipBoard= async()=>{
        await navigator.clipboard.writeText(respose.secret);
        setMessage("Copied to clipboard");
    }
  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl text-center font-light text-gray-800">
          Turn on 2FA Verification
        </h2>
        <p className="text-center text-gray-500 text-base mt-2 px-6">
          Scan the QR code with your authenticator app to enable two-factor authentication.
        </p>
      </div>

      <div className="p-6">
        <div className="flex justify-center">
          <img
            src={respose.qrCode} 
            alt="2FA QR Code"
            className="mb-4 border rounded-md"
          />
        </div>

        <div className="flex items-center mt-3 mb-3">
          <div className="border-t border-gray-200 flex-grow"></div>
          <div className="text-gray-600 text-sm font-light px-2">
            QR enter the code manually
          </div>
          <div className="border-t border-gray-200 flex-grow"></div>
        </div>
        <div className='mb-6'>
            {message && <p className='text-green-600 text-sm mb-3  '>{message}</p> }
            <input readOnly  defaultValue="" value={respose.secret}  className='w-full border rounded mt-2 text-xs text-gray-600 p-4  '
           onClick={copyClipBoard} />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={onSetupComplete}>
          Continue to Verification
        </button>
      </div>
    </div>
  );
};

export default TwoFASetup;
