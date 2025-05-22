import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import LoadingPage from "./loadingPage.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
import { UserSettingComponent } from "./chatPage/UserSettingComponent.jsx";

export default function ChatPage() {
  let navigate = useNavigate();
  const [connectionStatus,setconnectionStatus] = useState(false);

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
    <div className="bg-primaryColor min-h-screen w-[100%]  text-textColor flex  overflow-hidden">
      <ServerListComponent/>

      <div className="flex min-w-[250px] flex-col bg-secondaryColor bg-opacity-[30%]">
        <input className="bg-primaryColor m-[10px] h-[35px] rounded-[5px] font-medium pl-[10px] hover:cursor-not-allowed border-solid border-[2px] border-primaryColor hover:border-otherColor hover:border-opacity-[50%]" disabled placeholder="search (soon)"/>
        <UserSettingComponent />     
      </div>

      <div className="flex w-[100%] flex-col bg-transparent bg-opacity-[30%] hover:cursor-not-allowed">
        <div className="text-[25px] ml-[10px] text-otherColor text-opacity-[50%]">
          Friends (soon)
        </div>      
      </div>
      <div className="flex min-w-[250px] flex-col bg-secondaryColor bg-opacity-[30%] hover:cursor-not-allowed">
         <div className="text-[25px] ml-[10px] text-otherColor text-opacity-[50%]">
          Notifications (soon)
          </div>
          
      </div>


    </div>:<LoadingPage someError={`server offline`} redirect={"/"}/>
  );
}
