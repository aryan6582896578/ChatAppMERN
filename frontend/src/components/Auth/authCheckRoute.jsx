import { useState, useEffect } from "react";
import { Outlet, useNavigate,useParams  } from "react-router";
import axios from "axios";
import LoadingPage from "../loadingPage";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [validcheck,setvalidcheck]= useState(false);
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
      if(data.data.status === "invalid"){
        navigate(`/${import.meta.env.VITE_VERSION}/me/chat`)
      }else{
        setvalidcheck(true)
      }
    }).catch(function (error) {
      console.log(error.toJSON());
    });
 }
  useEffect( () => {
    getUserData()
    permissionCheck()
  });
  if(validcheck){
    return <Outlet />;
  }else{
return <LoadingPage someError={"we are checking"}/>
  }


}
