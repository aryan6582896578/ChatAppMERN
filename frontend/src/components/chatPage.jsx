import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import LoadingPage from "./loadingPage.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
import { UserSettingComponent } from "./chatPage/UserSettingComponent.jsx";

export default function ChatPage() {
  let navigate = useNavigate();
  const [connectionStatus,setconnectionStatus] = useState(false);
  
  const[dmListDisplay,setdmListDisplay]=useState("flex")
  const[friendListDisplay,setfriendListDisplay]=useState("hidden")
  const[notificationListDisplay,setnotificationListDisplay]=useState("hidden")

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/username`, {
        withCredentials: true,
      }).then((data) => {
        setconnectionStatus(true)
      }).catch(function (error) {
        console.log(error);
      });
      
  }, []);

  return (connectionStatus?
    
    <div className="bg-primaryColor w-[100%] text-textColor flex flex-col overflow-hidden h-screen">
      <div className="flex min-h-[100%]">
        <ServerListComponent/>

        <div className={`w-[100%] ${dmListDisplay} min-h-[90%] sm:max-w-[250px]`}>
          <DmListComponent/>
        </div>
        <div className={`${friendListDisplay} sm:block w-[100%]`}>
        <FriendListComponent/>
        </div>

        <div className={`${notificationListDisplay} sm:block w-[100%] min-h-[100%] sm:w-[300px]`}>
          <NotificationListComponent/>
        </div>
      </div>
      
      <BottomBarComponent setdmListDisplay={setdmListDisplay} setfriendListDisplay={setfriendListDisplay} setnotificationListDisplay={setnotificationListDisplay} />

    </div>:<LoadingPage someError={`server offline`} redirect={"/"}/>
  );
}

function DmListComponent(){
  return(
      <div className="flex overflow-hidden flex-col bg-secondaryColor w-[100%] ">
        <input className="bg-primaryColor m-[10px] min-h-[40px] rounded-[5px] font-medium pl-[10px] hover:cursor-not-allowed border-solid border-[2px] border-primaryColor hover:border-otherColor hover:border-opacity-[50%] " disabled placeholder="search (soon)"/>
        <span className="overflow-y-hidden hover:overflow-y-auto pr-[10px]"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos error dolor quae minima eaque quaerat alias nulla, hic omnis reiciendis. Veritatis doloremque nostrum, repudiandae quae tempore molestiae maxime beatae architecto.</span>
        <UserSettingComponent />     
      </div>
  )
}

function FriendListComponent(){
  return(
    <div className="flex w-[100%] flex-col bg-transparent bg-opacity-[30%] hover:cursor-not-allowed">
      <div className="text-[25px] ml-[10px] text-otherColor text-opacity-[50%]">
        Friends (soon)
      </div>      
    </div>
  )
}

function NotificationListComponent(){
  return(
    <div className="flex w-[100%] flex-col bg-secondaryColor hover:cursor-not-allowed">
      <div className="text-[25px] ml-[10px] text-otherColor text-opacity-[50%]">
        Notifications (soon)
      </div>   
    </div>
  )
}

function BottomBarComponent({setdmListDisplay,setfriendListDisplay,setnotificationListDisplay}){
  return(
    <div className="bg-primaryColor font-medium min-h-[50px] min-w-[100%] fixed bottom-0 sm:hidden flex justify-evenly">
      <div className="w-[80%] flex ">
          <button className="bg-secondaryColor w-[80%] h-[30px] rounded-[5px] mr-auto ml-auto mt-auto mb-auto hover:text-otherColor hover:text-opacity-[80%]" onClick={()=>{setdmListDisplay("flex"),setfriendListDisplay("hidden"),setnotificationListDisplay("hidden")}}>
            dmlist
          </button>
        </div>
        <div className="w-[100%] flex">
          <button className="bg-secondaryColor w-[80%] h-[30px] rounded-[5px] mr-auto ml-auto mt-auto mb-auto hover:text-otherColor hover:text-opacity-[80%]" onClick={()=>{setdmListDisplay("hidden") ,setfriendListDisplay("flex"),setnotificationListDisplay("hidden")}}>
            friendlist
          </button>
        </div>
        <div className="w-[100%] flex">
          <button className="bg-secondaryColor w-[100%] h-[30px] rounded-[5px] mr-auto ml-auto mt-auto mb-auto hover:text-otherColor hover:text-opacity-[80%]"onClick={()=>{setdmListDisplay("hidden") ,setfriendListDisplay("hidden"),setnotificationListDisplay("flex")}}>
            notification
          </button>
        </div>
        <div className="w-[100%] flex">
          <button className="bg-secondaryColor w-[80%] h-[30px] rounded-[5px] mr-auto ml-auto mt-auto mb-auto hover:text-otherColor hover:text-opacity-[80%]">
            setting
          </button>
      </div>
    </div>
  )
}