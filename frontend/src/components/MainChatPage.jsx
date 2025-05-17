import { UserSettingComponent } from "./chatPage/UserSettingComponent.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
import { MemberListComponent } from "./chatPage/MemberListComponent.jsx";
import { ServerSettingComponent } from "./chatPage/ServerSettingComponent.jsx";
import { ChatBoxComponent } from "./chatPage/ChatBoxComponent.jsx";
import { useParams ,useNavigate  } from "react-router";
import ChannelListComponent from "./chatPage/ChannelListComponent.jsx";
import { useEffect, useState } from "react";
import { NoChannelComponent } from "./chatPage/NoChannelComponent.jsx";
import axios from "axios";
export default function MainChatPage() {

  const [channelCheck,setchannelCheck]=useState(false)
  const navigate = useNavigate();
  const parms = useParams();

  async function getUserData(){
    const userData = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
          withCredentials: true,
    })
     const userId = userData.data.userId
     return userId
  } 
  useEffect(()=>{
   
    
    async function getChannelData(){
      try {
        const userId = await getUserData();
        const channelListData = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/channelList/${parms.serverId}/${userId}`,{ 
        withCredentials: true 
      });
        const data = Object.keys(channelListData.data.channelList);
        
        if (parms.channelId) {
            if(data.includes(parms.channelId)){
              setchannelCheck(true);
            }else{
              navigate(`/${import.meta.env.VITE_VERSION}/@me/chat/${parms.serverId}`)
            }
          } else {
            setchannelCheck(false);
            if (data[0]) {
              navigate(`/${import.meta.env.VITE_VERSION}/@me/chat/${parms.serverId}/${data[0]}`);
            }
          } 
      } catch (error) {
        console.error(error,"error channel switch");
   
      }
    }
    getChannelData();

  },[parms.serverId,parms.channelId])


  return  (
    <div className="bg-primaryColor min-h-screen w-full  text-textColor flex  overflow-hidden">
      <ServerListComponent/>

      <div className="flex min-w-[250px] flex-col bg-primaryColor ">
        <ServerSettingComponent/>
       {channelCheck?<ChannelListComponent/>:""} 
        <UserSettingComponent />     
      </div>
     
     {channelCheck?"":<NoChannelComponent/>} 
     
     {channelCheck?<ChatBoxComponent />:""} 
     {channelCheck?<MemberListComponent/>:""} 

    </div>
  ) 
}

