import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import LoadingPage from "../loadingPage";
import ServerError from "./ServerErrorPage";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const [userStatus, setuserStatus] = useState(false);

  async function verifyUser(){
    const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`, {
      withCredentials: true,
    })
    if(userData.data.status === "userValid"){
      setuserStatus(true);
    }else{
      navigate(`/${import.meta.env.VITE_VERSION}/login`);
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
