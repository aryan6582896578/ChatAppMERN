import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
import { UserProfileComponent } from "./UserProfileComponent.jsx";
import { SettingComponent } from "./SettingComponent.jsx";

export default function ChatPage() {
  const[dmListDisplay,setdmListDisplay]=useState("flex")
  const[friendListDisplay,setfriendListDisplay]=useState("hidden")
  const[notificationListDisplay,setnotificationListDisplay]=useState("hidden")
  const[serverListDisplay,setserverListDisplay]=useState("flex")
  const[userSettingDisplay,setuserSettingDisplay]=useState("hidden")
  const[userSettingDisplayCheck,setuserSettingDisplayCheck]=useState(false)

  document.title =`Chat | ${import.meta.env.VITE_NAME}`
  return (
    
    <div className="bg-primaryColor w-[100%] text-textColor flex flex-col overflow-hidden h-screen">
      <div className="flex min-h-[100%]">
        <div className={`${serverListDisplay} flex`}>
          <ServerListComponent/>
        </div>
        
        <div className={`w-[100%] ${dmListDisplay} min-h-[90%] sm:max-w-[250px]`}>
          <DmListComponent setserverListDisplay={setserverListDisplay}/>
        </div>
        <div className={`${friendListDisplay} sm:block w-[100%]`}>
        <FriendListComponent/>
        </div>

        <div className={`${notificationListDisplay} sm:block w-[100%] min-h-[100%] sm:w-[300px]`}>
          <NotificationListComponent/>
        </div>
        <div className={`${userSettingDisplay} sm:hidden w-[100%] min-h-[100%] sm:w-[300px] bg-yellow-50`}>
          {userSettingDisplayCheck?<SettingComponent/>:""}
        </div>
      </div>
      
      <BottomBarComponent setdmListDisplay={setdmListDisplay} setfriendListDisplay={setfriendListDisplay} setnotificationListDisplay={setnotificationListDisplay} setserverListDisplay={setserverListDisplay} setuserSettingDisplay={setuserSettingDisplay} setuserSettingDisplayCheck={setuserSettingDisplayCheck}/>

    </div>
  );
}

function DmListComponent({setserverListDisplay}){
  return(
      <div className="flex overflow-hidden flex-col bg-primaryColor w-[100%] ">
        <input className="bg-secondaryColor m-[10px] min-h-[40px] rounded-[5px] font-medium pl-[10px] hover:cursor-not-allowed border-solid border-[2px] border-primaryColor text-otherColor/80 " disabled placeholder="search (soon)"/>
        <span className="overflow-y-hidden hover:overflow-y-auto pr-[10px] h-[100%]"> </span>
        <UserProfileComponent setserverListDisplay={setserverListDisplay} />     
      </div>
  )
}

function FriendListComponent(){
  return(
    <div className="flex w-[100%] flex-col bg-primaryColor hover:cursor-not-allowed h-[100%] border-l-secondaryColor sm:border-l-[1px]">
      <div className="text-[25px] ml-[10px] text-otherColor/50">
        Friends (soon)
      </div>      
    </div>
  )
}

function NotificationListComponent(){
  return(
    <div className="flex w-[100%] flex-col bg-primaryColor hover:cursor-not-allowed h-[100%] border-l-secondaryColor sm:border-l-[1px] ">
      <div className="text-[25px] ml-[10px] text-otherColor/50">
        Notifications (soon)
      </div>   
    </div>
  )
}

function BottomBarComponent({setdmListDisplay,setfriendListDisplay,setnotificationListDisplay,setserverListDisplay,setuserSettingDisplay,setuserSettingDisplayCheck}){
  return(
    <div className="bg-primaryColor font-medium min-h-[50px] min-w-[100%] fixed bottom-0 sm:hidden flex justify-evenly z-[50]">
      <div className="w-[80%] flex opacity-[80%]">
          <button className="w-[fit] mr-auto ml-auto mt-auto mb-auto" onClick={()=>{setdmListDisplay("flex"),setfriendListDisplay("hidden"),setnotificationListDisplay("hidden"),setserverListDisplay("flex"),setuserSettingDisplay("hidden"),setuserSettingDisplayCheck(false)}}>
            <img src="/userSearch.png"/>
          </button>
        </div>
        <div className="w-[100%] flex opacity-[80%]">
          <button className="w-[fit] mr-auto ml-auto mt-auto mb-auto" onClick={()=>{setdmListDisplay("hidden") ,setfriendListDisplay("flex"),setnotificationListDisplay("hidden"),setserverListDisplay("flex"),setuserSettingDisplay("hidden"),setuserSettingDisplayCheck(false)}}>
            <img src="/userAdd.png" />
          </button>
        </div>
        <div className="w-[100%] flex opacity-[80%]">
          <button className="w-[fit] mr-auto ml-auto mt-auto mb-auto" onClick={()=>{setdmListDisplay("hidden") ,setfriendListDisplay("hidden"),setnotificationListDisplay("flex"),setserverListDisplay("hidden"),setuserSettingDisplay("hidden"),setuserSettingDisplayCheck(false)}}>
            <img src="/notification.png" />
          </button>
        </div>
        <div className="w-[100%] flex opacity-[80%]">
          <button className="w-[fit] mr-auto ml-auto mt-auto mb-auto" onClick={()=>{setdmListDisplay("hidden") ,setfriendListDisplay("hidden"),setnotificationListDisplay("hidden"),setserverListDisplay("hidden"),setuserSettingDisplay("flex"),setuserSettingDisplayCheck(true)}}>
            <img src="/settings.png" />
          </button>
      </div>
    </div>
  )
}