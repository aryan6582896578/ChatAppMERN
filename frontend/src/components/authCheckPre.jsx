import { useState,useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
export default function AuthCheckPre(){
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`,{ withCredentials: true })
      .then((data) => {
        
        console.log(data.data.status)
        if(data.data.status==="userValid"){
    navigate(`/${import.meta.env.VITE_VERSION}/me/chat`)
}else{
    navigate(`/${import.meta.env.VITE_VERSION}/login`)
}
       })
      .catch(function (error) {
        console.log(error.toJSON());
      });
      
    }, [])
    
 
        return(
            <Outlet/>
        )

}


