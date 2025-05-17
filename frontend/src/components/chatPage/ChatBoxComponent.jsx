import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { socket } from "../managesocket";
import axios from "axios";
export function ChatBoxComponent() {
  const navigate = useNavigate();
  const parms = useParams();
  let date = new Date();
  const [messageData, setmessageData] = useState("");
  const [channelName,setchannelName]=useState("");
  const [displayMessage,setdisplayMessage]= useState([]);
  const sendMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.innerText=""
      const userMessage ={
        message:messageData,
        date:date.toUTCString()
      }
      socket.emit(`${parms.serverId}/${parms.channelId}`, userMessage)
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
    function getJwtCookie(){
      const cookie = document.cookie.match(/(?:^|;\s*)tokenJwt=([^;]*)/);
      if(cookie){
        return cookie[1]
      }
    }
    function setSocketData(){
      const jwtToken = getJwtCookie()
      const serverId = parms.serverId
      const channelId = parms.channelId
      socket.auth = {jwtToken,serverId,channelId}
    }
    setSocketData()
    socket.connect()
    socket.on(`${parms.serverId}/${parms.channelId}`,(messageData)=>{
      setdisplayMessage(a=>[...a,messageData])
    })
    return () => {
      socket.disconnect();
      setchannelName("")
    }
  }, [parms.serverId,parms.channelId])

 

  return (
    <div className="w-[100%] bg-primaryColor flex flex-col relative ">
      <div className="w-[100%] min-h-[45px] border-solid border-b-[1px] border-secondaryColor font-medium text-[30px] pl-[20px] hover:text-otherColor duration-[0.5s]">
        <span>#</span> {channelName}
      </div>
      <div className="h-[100%] mb-[55px]">
        {displayMessage.map((data,x)=>{
          return(
            <div key={x} className="m-[5px] hover:bg-otherColor hover:bg-opacity-[5%] p-[5px] rounded-[5px] cursor-pointer">
              <div className="font-medium text-[20px]" >{data.username}<span className="text-otherColor font-normal text-[10px] opacity-[50%] ml-[10px]">{data.date}</span></div>
              <div className="text-otherColor text-opacity-[80%]">{data.message}</div>
            </div>
          )
        })}

      </div>
      
      <div className="min-h-[55px] flex absolute bottom-0 bg-primaryColor w-[100%] ">
        <div
          contentEditable className="w-[100%] m-[5px] mb-[0xp] ml-[10px] outline-none bg-otherColor bg-opacity-[4%] text-[20px] pl-[10px] pt-[5px] rounded-[5px] text-otherColor text-opacity-[70%]"  onKeyDown={sendMessage} spellCheck={true}  onInput={(e) => {
            setmessageData(e.target.innerText);
            
          }}
        />
      </div>
    </div>
  );
}
