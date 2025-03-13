import { useState,useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
export default function AuthCheckMain(){

    const navigate = useNavigate();
    const [authStatus,setAuthStatus]=useState(false)

    useEffect(() => {
        
        if(authStatus){
            return navigate("/login")
     
         }
      
    }, [])
    
 
        return(
            <Outlet/>
        )
    
}