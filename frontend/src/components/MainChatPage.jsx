import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { socket } from "./managesocket.js";
import LoadingPage from "./loadingPage.jsx";

import { UserSetting } from "./chatPage/UserSetting.jsx";
import { ServerSettingBox, ServerSettingInviteBox } from "./chatPage/ServerSetting.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
export default function MainChatPage() {
  const navigate = useNavigate();
  const path = document.URL.split("chat/")[1];

  const [connectionStatus, setconnectionStatus] = useState(false);

  const [serverData, setserverData] = useState("");
  const [userListId, setuserListId] = useState([]);
  const [userListUsername, setuserListUsername] = useState([]);
  const [inputFieldValue, setinputFieldValue] = useState("");


  const [serverSettingBoxDisplay,setserverSettingBoxDisplay] = useState(false);
  const [serverSettingInviteBoxDisplay,setserverSettingInviteBoxDisplay] = useState(false);
  const [inviteCode,setinviteCode] = useState(false);
  
  const [username, setusername] = useState("someshitisseriouslywrong");

  function getUserData() {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/userdata`, {
        withCredentials: true,
      }).then((data) => {
        setusername(data.data.username);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }

  async function createServerInvite() {
    
  axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/inviteCode/${path}`,{
   withCredentials: true,
 }).then((data) => {
setinviteCode(data.data.inviteCode)

}).catch(function (error) {
 console.log(error.toJSON());
});
}
  useEffect(() => {
    getUserData();

    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
      chatBox.innerHTML = null;
    }

    function getChannelData() {
      axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/getChannelData/${path}`,{
            withCredentials: true,
          }).then((data) => {
          setserverData(data.data.channelData.name);
          setuserListId(Object.keys(data.data.channelData.members));
          setuserListUsername(Object.values(data.data.channelData.members));
        }).catch(function (error) {
          console.log(error.toJSON());
        });
    }
    getChannelData();

    socket.on(`${path}`, async (message) => {
      if (message.server) {
        getChannelData();
      } else {
        displayMessage(message);
      }
    });

    async function displayMessage(message) {
      let chatBox = document.getElementById("chatBox");
      let usernameDiv = document.createElement("div");
      usernameDiv.attributes;
      usernameDiv.className = "text-white";
      usernameDiv.innerText = message.username;
      chatBox.append(usernameDiv);

      let messageDiv = document.createElement("div");
      messageDiv.innerText = message.message;
      chatBox.append(messageDiv);
    }

    function getJWTToken() {
      const match = document.cookie.match(/(?:^|;\s*)tokenJwt=([^;]*)/);
      return match ? match[1] : null;
    }

    function setJWTToken() {
      const jwt = getJWTToken();
      socket.auth = { path, jwt };
      socket.connect();
      socket.on("connect", () => {
        setconnectionStatus(true);
      });
    }
    setJWTToken();
 
    setserverSettingBoxDisplay(false)
    setserverSettingInviteBoxDisplay(false)

    return () => {
      setserverData("");
      socket.disconnect();
    };
  }, [path]);

  function inputFieldData(e) {
    e.preventDefault();
    socket.emit(`${path}`, inputFieldValue);
    setinputFieldValue("");
  }

  return connectionStatus ? (
    <div className="bg-primaryColor min-h-screen w-full  text-textColor flex  overflow-hidden">
      <ServerListComponent/>

      {serverSettingBoxDisplay?<ServerSettingBox setserverSettingBoxDisplay={setserverSettingBoxDisplay} setserverSettingInviteBoxDisplay={setserverSettingInviteBoxDisplay} createServerInvite={createServerInvite}/> :""}
      {serverSettingInviteBoxDisplay?<ServerSettingInviteBox setserverSettingInviteBoxDisplay={setserverSettingInviteBoxDisplay} inviteCode={inviteCode}/>:""}



      <div className="bg-secondaryColor w-[16%] text-otherColor relative h-[100vh] ">
        <div className="w-[100%] h-[95%] overflow-y-auto overflow-x-hidden">
          <div className="bg-primaryColor max-h-[40px] text-text2Color text-[20px] font-semibold text-center pt-[3px] border-solid border-b-[1px] border-textColor flex">
            <div className="ml-[5px]">{serverData}</div>
            <div className="ml-auto"><button onClick={()=>{
              setserverSettingBoxDisplay(true)
            }} className="min-w-[5px] min-h-[30px] bg-textColor hover:bg-otherColor  "/></div>
             
          </div>
          channels
        </div>
        <UserSetting username={username} />
      </div>

      <div className="bg-primaryColor w-[65%] p-[10px] pb-[10px] min-h-[93vh] flex flex-col overflow-y-auto">
        <div className="bg-primaryColor w-[100%]  min-h-[93vh] max-h-[93vh] mb-[0px] overflow-y-auto">
          <div id="chatBox" className=" pl-[10px]  "></div>
        </div>

        <div className="h-[5vh]  w-[100%] ">
          <form onSubmit={inputFieldData} className="h-[100%]  w-[100%]">
            <input
              id="inputField"
              onChange={(e) => {
                setinputFieldValue(e.target.value);
              }}
              value={inputFieldValue}
              className="bg-secondaryColor outline-none text-otherColor w-[100%] h-[100%] rounded-[5px] p-[5px] overflow-y-auto break-words text-wrap flex-wrap overflow-x-hidden"
            />
          </form>
        </div>
      </div>

      <div className="bg-secondaryColor w-[15%] max-h-[100vh] pb-[20px]">
        <div className="bg-primaryColor m-[10px] p-[10px] rounded-[5px] bg-opacity-70 min-h-[100%]  overflow-y-auto overflow-x-hidden">
          <div className="text-[25px] font-bold text-center mb-[10px] ">
            MEMBERS
          </div>

          <div>
            {userListId?.map((channel, index) => (
              <div
                key={channel}
                className="m-auto text-text2Color text-[20px]  "
              >
                <div className="w-[100%] p-[5px] hover:text-text1Color hover:cursor-not-allowed ">
                  {userListUsername[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage someError={`server offline`} />
  );





 
  
}

function ServerSettingsOptions(){
  return(
    <></>
  )
}