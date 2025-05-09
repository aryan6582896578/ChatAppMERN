import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import LoadingPage from "../loadingPage";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const [userStatus, setuserStatus] = useState(false);

  async function verifyUser(){
    const userData = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
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
    return <LoadingPage someError={"we are checking"}/>
    }
}
