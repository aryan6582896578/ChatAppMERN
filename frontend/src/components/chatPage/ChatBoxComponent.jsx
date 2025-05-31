import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { socket } from "../managesocket";
import axios from "axios";


export function ChatBoxComponent() {
  const navigate = useNavigate();
  const parms = useParams();
  let date = new Date();

  const [messageData, setmessageData] = useState("");

  
  const [displayMessageSocket,setdisplayMessageSocket]= useState([]);
  const [displayMessageDb,setdisplayMessageDb]= useState([]);

  const getMessageCount=useRef(20);
  const getMaxMessageCount = useRef(21);

  const [topReached,settopReached]=useState(false)
  const chatDiv = useRef(null)

  function scrollBottom(){
    if (chatDiv.current) {
      chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
    }
  }
  useEffect(() => {
    scrollBottom()
  }, [displayMessageDb]);
  


  async function getMessage() {
      const messageData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/messageData/${parms.serverId}/${parms.channelId}/${getMessageCount.current}`,{
        withCredentials: true,
      });
      setdisplayMessageDb(messageData.data.message)
      getMaxMessageCount.current = messageData.data.messageCountMax
  }

  async function sendMessage(e) {
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

    setSocketData()
    socket.connect()
    socket.on(`${parms.serverId}/${parms.channelId}`,async (messageData)=>{
      setdisplayMessageSocket(a=>[...a,messageData])    
    })
    
    return () => {
      socket.disconnect();
      setdisplayMessageSocket([])
      setdisplayMessageDb([])
    }
  }, [parms.serverId,parms.channelId])

 
  return (
    <div className="bg-cyan-400 w-[100%] h-[100%]" >
      <div className="bg-black flex flex-col h-[100%]">
        <div className="bg-primaryColor flex h-[100%] flex-col overflow-y-auto" ref={chatDiv}>
          <div>
            {displayMessageDb?.map((data,x)=>{
              return( 
                <div key={x} className="m-[5px] hover:bg-otherColor hover:bg-opacity-[5%] p-[5px] rounded-[5px] cursor-pointer" >
                              
                  <div className="font-medium text-[20px]" >{displayMessageDb[x].username}<span className="text-otherColor font-normal text-[10px] opacity-[50%] ml-[10px]">{displayMessageDb[x].displayDate}</span></div>
                  <div className="text-otherColor text-opacity-[80%]">{displayMessageDb[x].message}</div>
                </div>
              )
            })}
          </div>
          <div>
            {displayMessageSocket?.map((data,x)=>{
              return(
                <div key={x} className="m-[5px] hover:bg-otherColor hover:bg-opacity-[5%] p-[5px] rounded-[5px] cursor-pointer">
                  <div className="font-medium text-[20px]" >{data.username}<span className="text-otherColor font-normal text-[10px] opacity-[50%] ml-[10px]">{data.date}</span></div>
                  <div className="text-otherColor text-opacity-[80%]">{data.message}</div>
                </div>
              )
            })} 
          </div>   
          
        </div>
        
        <div className="min-h-[55px] flex bg-primaryColor">
              <div contentEditable className="w-[100%] m-[5px] mb-[0xp] ml-[10px] outline-none bg-otherColor bg-opacity-[4%] text-[20px] pl-[10px] pt-[5px] rounded-[5px] text-otherColor text-opacity-[70%]"  onKeyDown={sendMessage} spellCheck={true}  onInput={(e) => {
                    setmessageData(e.target.innerText);         
              }}/>
        </div>
      
      </div>
    </div>
  );
}
