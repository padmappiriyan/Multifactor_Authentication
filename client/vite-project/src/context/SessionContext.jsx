import { createContext, useContext ,useEffect,useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);


export const SessionProvider = ({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const storedUser = JSON.parse(sessionStorage.getItem('user')); 
        console.log('Stored user from sessionStorage:', storedUser);  
        if(storedUser){
            setIsLoggedIn(true);
            setUser(storedUser);
        } 
    },[]);
    const login = (userData)=>{
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    }
    const logout = ()=>{
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('user');
    }

    return (
        <SessionContext.Provider value={{isLoggedIn,user,login,logout}}>
            {children}
        </SessionContext.Provider>
    )

}