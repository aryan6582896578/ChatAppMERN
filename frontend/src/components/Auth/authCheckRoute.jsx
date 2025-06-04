import { useState, useEffect } from "react";
import { Outlet, useNavigate,useParams  } from "react-router";
import axios from "axios";
export default function AuthCheckMain() {
  const navigate = useNavigate();
  const parms = useParams()
  const serverId = parms.serverId

  const[update,setupdate]=useState(false)

  async function getUserData(){
   const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`, {
    withCredentials: true,
  })
  const userId = await userData.data.userId
  return userId
}
 async function permissionCheck(){
    const userId = await getUserData()

    const serverData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/permissionCheckServer/${serverId}/${userId}`, {
      withCredentials: true,
    })
    if(serverData.data.status === "userInValid"){
      navigate(`/${import.meta.env.VITE_VERSION}/@me/chat`)
    }
    if(serverData.data.status ==="validChannel"){
      setupdate(true)
      // navigate(`/${import.meta.env.VITE_VERSION}/@me/chat/${serverId}/${serverData.data.channelId}`)
      
    }
  }
  useEffect(() => {
  permissionCheck()
  
  }, [parms.serverId,parms.channelId])
  if(update){
    return (
      <Outlet/>
    )
  }else{
    return (
      <Outlet/>
    )
  }
}
