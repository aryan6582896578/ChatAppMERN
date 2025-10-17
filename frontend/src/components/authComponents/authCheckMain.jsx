import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import LoadingPage from "../otherComponents/loadingPage";
import ServerError from "../otherComponents/ServerErrorPage";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const [userStatus, setuserStatus] = useState(false);

  async function verifyUser(){
    const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION_LIVE}/@me`, {
      withCredentials: true,
    })
    if(userData.data.status === "userValid"){
      setuserStatus(true);
    }else{
      navigate(`/${import.meta.env.VITE_VERSION_LIVE}/login`);
    }
  }

  useEffect(() => {
    verifyUser()
  }, []);

  if(userStatus){
    return <Outlet />;
  }else{
    return <ServerError/>
    }
}
