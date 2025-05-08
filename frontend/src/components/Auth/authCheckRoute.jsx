import { useState, useEffect } from "react";
import { Outlet, useNavigate,useParams  } from "react-router";
import axios from "axios";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [validcheck,setvalidcheck]= useState(false);
  const[defaultChannel,setdefaultChannel]=useState("")
  const parms = useParams(); 

  async function getUserData(){
    // await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
    //      withCredentials: true,
    //    }).then((data) => {
    //      setuserId(data.data.userId)
    //    }).catch(function (error) {
    //      console.log(error.toJSON());
    //    });
 }
 async function permissionCheck() {
  try {
    const getuserId = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
          withCredentials: true,
        })
    setuserId(getuserId.data.userId)
    if(userId){
      const permissionCheck= await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/permissionCheckServer/${parms.serverId}/${userId}`,{
              withCredentials: true,
            })
    console.log(permissionCheck.data)
    }
  } catch (error) {
    console.log(error,"error in permission check authcheckroute")
  }
 }
//  async function permissionCheck() {

//   await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
//     withCredentials: true,
//   }).then((data) => {
//     setuserId(data.data.userId)
//   }).catch(function (error) {
//     console.log(error.toJSON());
//   });
//   if(userId){
    
//     await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/permissionCheckServer/${parms.serverId}/${userId}`,{
//       withCredentials: true,
//     }).then((data) => {
//     if(data.data.status === "invalid"){
//       navigate(`/${import.meta.env.VITE_VERSION}/me/chat`)
//     }else{
//        setdefaultChannel(data.data.channelId)
//       setvalidcheck(true)
//     }
//   }).catch(function (error) {
//     console.log(error);
//   });
//   }

//  }
  useEffect(() => {
    permissionCheck()
  },[]);//parms.serverId,navigate
  if(validcheck && defaultChannel){
    return navigate(`/${import.meta.env.VITE_VERSION}/me/chat/${parms.serverId}/${defaultChannel}`);  
  }else{
    console.log("gg")
  }
  return <Outlet />;

}
