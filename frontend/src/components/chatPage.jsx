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
    <div className="bg-primaryColor min-h-screen w-full  text-textColor flex  overflow-hidden">
      <ServerListComponent/>

      <div className="flex min-w-[250px] flex-col bg-secondaryColor bg-opacity-[30%] hover:cursor-not-allowed">
 
        <UserSettingComponent />     
      </div>



    </div>:<LoadingPage someError={`server offline`} redirect={"/"}/>
  );
}
