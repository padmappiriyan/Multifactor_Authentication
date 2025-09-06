import React from 'react'
import { useNavigate } from 'react-router-dom';
import TwoFAVerification from '../components/TwoFAVerification';

const Verify2FA = () => {
  const navigate = useNavigate();
  const handleVerification = async(data) => {
    if(data.success){
      navigate('/'); 
    }
    
  }
  const handle2FAReset = async(data) => {
    if(data.success){
      navigate('/setup-2fa');
    }
    
  }
  return (
     <TwoFAVerification onVerifySuccess={handleVerification} onRestSuccess={handle2FAReset} />
  )
}

export default Verify2FA