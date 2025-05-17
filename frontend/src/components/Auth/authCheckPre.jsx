import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
export default function AuthCheckPre() {
  const navigate = useNavigate();
  const [userStatus, setuserStatus] = useState(false);

  async function verifyUser(){
    const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`, {
      withCredentials: true,
    })
    if(userData.data.status === "userValid"){
      setuserStatus(true);
      navigate(`/${import.meta.env.VITE_VERSION}/@me/chat`);
    }
  }
  useEffect(() => {
    verifyUser()
  }, []);

  if(!userStatus){
    return <Outlet />;
  }
 
}
