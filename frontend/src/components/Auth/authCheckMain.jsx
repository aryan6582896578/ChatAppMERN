import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import LoadingPage from "../loadingPage";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const [userStatus, setuserStatus] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
        withCredentials: true,
      }).then((data) => {
        // console.log(data.data.status);
        if (data.data.status === "userValid") {
          setuserStatus(true);
        } else {
          navigate(`/${import.meta.env.VITE_VERSION}/login`);
        }
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }, []);

    if(userStatus){
      return <Outlet />;
    }else{
  return <LoadingPage someError={"we are checking"}/>
    }

}
