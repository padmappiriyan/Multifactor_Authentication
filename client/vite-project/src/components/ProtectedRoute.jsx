import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom';
import { useSession } from '../context/SessionContext';
const ProtectedRoute = () => {
    const {isLoggedIn}=useSession(); 
  return isLoggedIn ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoute;