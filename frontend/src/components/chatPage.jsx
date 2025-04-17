import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import LoadingPage from "./loadingPage.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";

export default function ChatPage() {
  let navigate = useNavigate();
  const [userName, setuserName] = useState("someshitisseriouslywrong");
  const [channelList, setchannelList] = useState([]);
  const [connectionStatus,setconnectionStatus] = useState(false);
  const [createServerDisplay,setcreateServerDisplay] = useState(false)
  const[createServerData,setcreateServerData]=useState({serverName:""})
  async function ServerData(){
    console.log(createServerData.serverName)
    sendData()
  }
  useEffect(() => {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/userdata`, {
        withCredentials: true,
      }).then((data) => {
        setchannelList(data.data.channels), setuserName(data.data.username);
        setconnectionStatus(true)
      }).catch(function (error) {
        console.log(error.toJSON());
      });
      
  }, []);

  const sendData = async () => {
    const url = `http://localhost:4500/${import.meta.env.VITE_VERSION}/me/createServer`
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(createServerData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json  = await response.json();
      if(json.status==="CreatedServer"){
        setcreateServerDisplay(false)
        await navigate(`${json.serverId}`)
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };

  


  return (connectionStatus?
    <div className="bg-primaryColor min-h-screen w-full  text-textColor flex  ">
      <ServerListComponent/>


      <div className="bg-secondaryColor w-[16%] text-otherColor relative h-[100vh] ">
        <div className="w-[100%] h-[95%] overflow-y-auto overflow-x-hidden">
dms
        </div>
        <div className="w-[100%] h-[5%] bg-primaryColor absolute bottom-[0px] rounded-[5px] text-[25px]  pl-[10px] hover:rounded-none hover:cursor-pointer">
          <div className="flex relative w-full h-full">
            <span className="hover:text-text3Color">{userName}</span>
            <div className="min-w-[5px] min-h-[100%] bg-textColor hover:bg-text3Color absolute right-[0px] bottom-[0px] hover:cursor-not-allowed "></div>
          </div>
        </div>
      </div>

      <div className="bg-primaryColor w-[65%] ">
Friends
      </div>

      <div className="bg-secondaryColor w-[15%]">
something
      </div>
    </div>:<LoadingPage someError={`server offline`} redirect={"/"}/>
  );
}
