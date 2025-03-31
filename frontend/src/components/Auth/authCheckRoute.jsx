import { useState, useEffect } from "react";
import { Outlet, useNavigate,useParams  } from "react-router";
import axios from "axios";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const { id } = useParams(); 
  async function getUserData(){
    await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
         withCredentials: true,
       }).then((data) => {
         setuserId(data.data.userId)
       }).catch(function (error) {
         console.log(error.toJSON());
       });
 }
 async function permissionCheck() {
         axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/permissionCheck/${id}/${userId}`,{
        withCredentials: true,
      }).then((data) => {
      if(data.data.status === "invalidUser"){
        navigate(`/${import.meta.env.VITE_VERSION}/me/chat`)
      }
    }).catch(function (error) {
      console.log(error.toJSON());
    });
 }
  useEffect( () => {

    getUserData()
    permissionCheck()
  });

  return <Outlet />;
}
