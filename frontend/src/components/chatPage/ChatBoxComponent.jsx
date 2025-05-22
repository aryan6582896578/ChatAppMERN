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
  const [displayMessageSocket,setdisplayMessageSocket]= useState([]);
  const [displayMessageDb,setdisplayMessageDb]= useState([]);

  const getMessageCount=useRef(20);
  const getMaxMessageCount = useRef(21);

  const [topReached,settopReached]=useState(false)

  function scrollTopPage(){
    if(topReached&&getMessageCount.current<getMaxMessageCount.current){
       getMessageCount.current += 20;
            getMessage()  
            settopReached(false)
    }
  }
  useEffect(() => {
    scrollTopPage()
    
  }, [topReached])
  
  async function getUserData() {
    const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`,{
        withCredentials: true,
      });
    const userId = userData.data.userId;
    return userId;
  }

  async function getMessage() {
      const messageData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/messageData/${parms.serverId}/${parms.channelId}/${getMessageCount.current}`,{
        withCredentials: true,
      });
      setdisplayMessageDb(messageData.data.message)
      getMaxMessageCount.current = messageData.data.messageCountMax
  }

  function sendMessage(e) {
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

  async function getChannelData() {
    const userId = await getUserData();
    if(parms.channelId){
      const channelNameData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/channelData/${ parms.serverId}/${parms.channelId}/${userId}`,{
        withCredentials: true,
      });
      setchannelName(channelNameData.data.channelName)
    }
  }

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
  useEffect(() => {
    getMessage()
    getChannelData();

    setSocketData()
    socket.connect()
    socket.on(`${parms.serverId}/${parms.channelId}`,async (messageData)=>{
      setdisplayMessageSocket(a=>[...a,messageData])    
    })
    
    return () => {
      socket.disconnect();
      setchannelName("")
      setdisplayMessageSocket([])
      setdisplayMessageDb([])
    }
  }, [parms.serverId,parms.channelId])

 

  return (
    <div className="w-[100%] bg-primaryColor flex flex-col relative h-[100vh] " >
      <div className="w-[100%] min-h-[45px] border-solid border-b-[1px] border-secondaryColor font-medium text-[30px] pl-[20px] hover:text-otherColor duration-[0.5s]">
        <span>#</span> {channelName}
      </div>
      
      <div className=" mb-[55px] overflow-y-scroll overflow-x-hidden " onScroll={(e)=>{
        if(e.target.scrollTop===0){
          settopReached(true)              
        }
      }}>
        {displayMessageDb?.map((data,x)=>{
          return( 
            <div key={x} className="m-[5px] hover:bg-otherColor hover:bg-opacity-[5%] p-[5px] rounded-[5px] cursor-pointer" >            
              <div className="font-medium text-[20px]" >{displayMessageDb[x].username}<span className="text-otherColor font-normal text-[10px] opacity-[50%] ml-[10px]">{displayMessageDb[x].displayDate}</span></div>
              <div className="text-otherColor text-opacity-[80%]">{displayMessageDb[x].message}</div>
            </div>
          )
        })}
        {displayMessageSocket?.map((data,x)=>{
          return(
            <div key={x} className="m-[5px] hover:bg-otherColor hover:bg-opacity-[5%] p-[5px] rounded-[5px] cursor-pointer">
              <div className="font-medium text-[20px]" >{data.username}<span className="text-otherColor font-normal text-[10px] opacity-[50%] ml-[10px]">{data.date}</span></div>
              <div className="text-otherColor text-opacity-[80%]">{data.message}</div>
            </div>
          )
        })}
        <div />
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
