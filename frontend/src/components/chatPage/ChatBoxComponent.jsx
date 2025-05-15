import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function ChatBoxComponent() {
  const navigate = useNavigate();
  const parms = useParams();
  let date = new Date();
  const inputRef = useRef(null);
  const [messageData, setmessageData] = useState("");
  const [channelName,setchannelName]=useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("gg", messageData);
    }
  };
  async function getUserData() {
    const userData = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`,{
        withCredentials: true,
      });
    
    const userId = userData.data.userId;
    return userId;
  }

  async function getChannelData() {
    const userId = await getUserData();
    if(parms.channelId){
      const channelNameData = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/channelData/${ parms.serverId}/${parms.channelId}/${userId}`,{
        withCredentials: true,
      });
      setchannelName(channelNameData.data.channelName)
    }
    
  }
  useEffect(() => {
    getChannelData();
    return ()=>{
      setchannelName("")
    }
  }, [parms.serverId, parms.channelId]);
 

  return (
    <div className="w-[100%] bg-primaryColor flex flex-col relative ">
      <div className="w-[100%] min-h-[45px] border-solid border-b-[1px] border-secondaryColor font-medium text-[30px] pl-[20px] hover:text-otherColor">
        <span>#</span> {channelName}
      </div>
      <div className="h-[100%] mb-[55px]">
        {messageData}
      </div>
      
      <div className="min-h-[55px] flex absolute bottom-0 bg-primaryColor w-[100%] ">
        <div
          contentEditable className="w-[100%] m-[5px] mb-[0xp] ml-[10px] outline-none bg-otherColor bg-opacity-[4%] text-[20px] pl-[10px] pt-[5px]"ref={inputRef}onKeyDown={handleKeyDown} spellCheck={true}onInput={(e) => {
            setmessageData(e.target.innerText);
          }}
        />
      </div>
    </div>
  );
}
