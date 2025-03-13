import { useState,useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
export default function authCheckPre(){

    const navigate = useNavigate();
    const [authStatus,setAuthStatus]=useState(false)
    useEffect(() => {
        
        if(authStatus){
            return navigate("/me/chat")
     
         }

    }, [authStatus,navigate])
    

     
     
        return(
            <>  
         
            <Outlet/>
            </>
        )
    
}