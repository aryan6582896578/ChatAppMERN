import { UserProfileComponent } from "./chatPage/UserProfileComponent.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
import { MemberListComponent } from "./chatPage/MemberListComponent.jsx";
import { ServerSettingComponent } from "./chatPage/ServerSettingComponent.jsx";
import { ChatBoxComponent } from "./chatPage/ChatBoxComponent.jsx";
import { useParams ,useNavigate  } from "react-router";
import ChannelListComponent from "./chatPage/ChannelListComponent.jsx";
import { useEffect, useState } from "react";
import { NoChannelComponent } from "./chatPage/NoChannelComponent.jsx";
import axios from "axios";
import ChannelHeadComponent from "./chatPage/ChannelHeadComponent.jsx";
import { UserSettingComponent } from "./chatPage/UserSettingComponent.jsx";
export default function MainChatPage() {

  const [channelCheck,setchannelCheck]=useState(false)
  const [memberListDisplay,setmemberListDisplay]=useState(true)

  const[serverListDisplay,setserverListDisplay]=useState("flex")
  const[channelListDisplay,setchannelListDisplay]=useState("flex")
  const[chatBoxDisplay,setchatBoxDisplay]=useState("hidden")  
  const[memberListSMDisplay,setmemberListSMDisplay]=useState("hidden")
  const[userSettingDisplay,setuserSettingDisplay]=useState("hidden")
  const[bottomBarDisplay,setbottomBarDisplay]=useState(true)
  const navigate = useNavigate();
  const parms = useParams();

  async function getUserData(){
    const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`, {
          withCredentials: true,
    })
     const userId = userData.data.userId
     return userId
  } 
  useEffect(()=>{
   
    
    async function getChannelData(){
      try {
        const userId = await getUserData();
        const channelListData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/channelList/${parms.serverId}/${userId}`,{ 
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
      <div className="bg-black max-h-screen flex text-otherColor max-w-full overflow-hidden">
        <div className="bg-blue-950 ">
         <div className={`${serverListDisplay} sm:flex`}>
           <ServerListComponent/>
         </div>
        </div>
        <div className={`${channelListDisplay} sm:flex bg-blue-800 flex-col overflow-hidden flex-1 sm:flex-none`}> 
            <ServerSettingComponent/>
            {channelCheck?<ChannelListComponent setchatBoxDisplay={setchatBoxDisplay} setserverListDisplay={setserverListDisplay} setchannelListDisplay={setchannelListDisplay} setbottomBarDisplay={setbottomBarDisplay}/>:""} 
            <UserProfileComponent /> 
        </div>
        <div className={`${chatBoxDisplay} sm:flex  flex-1 min-w-0 bg-blue-600 flex flex-col overflow-hidden min-h-screen`}>
           {channelCheck?"":<NoChannelComponent/>} 
          <div className="">
            {channelCheck?<ChannelHeadComponent setmemberListDisplay={setmemberListDisplay} memberListDisplay={memberListDisplay}  setmemberListSMDisplay={setmemberListSMDisplay} setchannelListDisplay={setchannelListDisplay} setchatBoxDisplay={setchatBoxDisplay} setserverListDisplay={setserverListDisplay} setuserSettingDisplay={setuserSettingDisplay} setbottomBarDisplay={setbottomBarDisplay}/>:""} 
          </div>
          <div className="bg-pink-500 flex flex-1 overflow-hidden ">
                 {channelCheck?<ChatBoxComponent  />:""} 
                 {channelCheck? (memberListDisplay?<MemberListComponent memberListSMDisplay={memberListSMDisplay}/>:""):""}
          </div>
        </div>

          <div className={`${userSettingDisplay} sm:hidden w-[100%] min-h-[100%] sm:w-[300px]`}>
         <UserSettingComponent/>
        </div> 
       {bottomBarDisplay? <BottomBarComponent setchannelListDisplay={setchannelListDisplay} setchatBoxDisplay={setchatBoxDisplay} setserverListDisplay={setserverListDisplay} setuserSettingDisplay={setuserSettingDisplay} setbottomBarDisplay={setbottomBarDisplay}/>:""}

      </div>
  ) 
}

function BottomBarComponent({setserverListDisplay,setchannelListDisplay,setchatBoxDisplay,setuserSettingDisplay,setbottomBarDisplay}){
  return(
    <div className="bg-primaryColor font-medium min-h-[50px] min-w-[100%] fixed bottom-0 sm:hidden flex justify-evenly z-[100]">
      <div className="w-[80%] flex opacity-[80%]">
          <button className="w-[fit] mr-auto ml-auto mt-auto mb-auto" onClick={()=>{setserverListDisplay("flex"),setchannelListDisplay("flex"),setchatBoxDisplay("hidden"),setuserSettingDisplay("hidden") }}>
            <img src="/server.png"/>
          </button>
        </div>
        <div className="w-[100%] flex opacity-[80%]">
          <button className="w-[fit] mr-auto ml-auto mt-auto mb-auto" onClick={()=>{setserverListDisplay("hidden"),setchannelListDisplay("hidden"),setchatBoxDisplay("flex"),setuserSettingDisplay("hidden"),setbottomBarDisplay(false)}}>
            <img src="/text.png" />
          </button>
        </div>
        <div className="w-[100%] flex opacity-[80%]">
          <button className="w-[fit] mr-auto ml-auto mt-auto mb-auto" onClick={()=>{setserverListDisplay("hidden"),setchannelListDisplay("hidden"),setchatBoxDisplay("hidden"),setuserSettingDisplay("flex")}}>
            <img src="/settings.png" />
          </button>
      </div>
    </div>
  )
}
