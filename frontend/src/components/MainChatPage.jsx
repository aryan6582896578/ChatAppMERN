import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { socket } from "./managesocket.js";
import LoadingPage from "./loadingPage.jsx";

import { UserSettingComponent } from "./chatPage/UserSettingComponent.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
import { ServerMemberListComponent } from "./chatPage/ServerMemberListComponent.jsx";
import { ServerSettingComponent } from "./chatPage/ServerSettingComponent.jsx";
export default function MainChatPage() {
  const navigate = useNavigate();
  const path = document.URL.split("chat/")[1];

  const [connectionStatus, setconnectionStatus] = useState(false);
  const [inputFieldValue, setinputFieldValue] = useState("");

  useEffect(() => {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
      chatBox.innerHTML = null;
    }

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


    return () => {
    
      setinputFieldValue("");
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

      <div className="flex min-w-[250px] flex-col bg-black">
        <ServerSettingComponent/>
        <UserSettingComponent />     
      </div>


   
      <div className="bg-primaryColor w-[70%] p-[10px] pb-[10px] min-h-[93vh] flex flex-col overflow-y-auto">
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

      <ServerMemberListComponent/>
    </div>
  ) : (<LoadingPage someError={`server offline`} />);
}

