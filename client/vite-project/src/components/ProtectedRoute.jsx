import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom';
import { useSession } from '../context/SessionContext';
const ProtectedRoute = () => {
    const {isLoggedIn,loading}=useSession(); 
    if(loading)
        return <div>Loading...</div>
  return isLoggedIn ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoute;
