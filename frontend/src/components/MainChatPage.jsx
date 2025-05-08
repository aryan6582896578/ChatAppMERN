import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";


import { UserSettingComponent } from "./chatPage/UserSettingComponent.jsx";
import { ServerListComponent } from "./chatPage/ServerListComponent.jsx";
import { ServerMemberListComponent } from "./chatPage/ServerMemberListComponent.jsx";
import { ServerSettingComponent } from "./chatPage/ServerSettingComponent.jsx";
import { ChatBoxComponent } from "./chatPage/ChatBoxComponent.jsx";
export default function MainChatPage() {
  const navigate = useNavigate();
  const path = document.URL.split("chat/")[1];

  return  (
    <div className="bg-primaryColor min-h-screen w-full  text-textColor flex  overflow-hidden">
      <ServerListComponent/>

      <div className="flex min-w-[250px] flex-col bg-secondaryColor bg-opacity-[30%] hover:cursor-not-allowed">
        <ServerSettingComponent/>
        <UserSettingComponent />     
      </div>

      <ChatBoxComponent/>

      <ServerMemberListComponent/>
    </div>
  ) 
}

