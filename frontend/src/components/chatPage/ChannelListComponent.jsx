import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export default function ChannelListComponent(){
    const navigate = useNavigate();
    const parms = useParams();
    const[serverId,setserverId]=useState("")
    const [channelId, setchannelId] = useState([]);
    const [channelName, setchannelName] = useState([]);
    
      async function getUserData(){
        const userData = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/verify`, {
          withCredentials: true,
        })
        setserverId(parms.serverId)
        const userId = userData.data.userId
        return userId
      }

    async function getChannelData() {
      const userId = await getUserData()

        const channelList = await axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/channelList/${parms.serverId}/${userId}`,{
            withCredentials: true,
          })
          
          setchannelId(Object.keys(channelList.data.channelList))
          setchannelName(Object.values(channelList.data.channelList))
          
    }
    useEffect(() => {
      
      getChannelData()
      
    }, [parms.serverId,parms.channelId])
    
      return(
          <div className="bg-primaryColor max-w-[250px] h-[100%] mb-[55px] mt-[45px] flex flex-col pt-[10px] relative">   
          <div className="text-[10px] font-bold ml-[5px] flex min-h-[20px] hover:underline hover:cursor-pointer text-otherColor text-opacity-[60%]">TEXT CHANNELS <span className="end-[0px] top-0 flex absolute font-bold text-[20px] hover:text-text3Color duration-[0.5s] cursor-no-drop">+</span></div>
                {channelName.map((channelName,x)=>{
                  return (
                    <button key={channelId[x]} className="flex text-[20px] m-[5px] rounded-[5px] mb-[5px] font-medium bg-otherColor bg-opacity-[4%] hover:text-otherColor duration-[0.5s] hover:bg-opacity-[5%]" onClick={()=>(
                     navigate(`/${import.meta.env.VITE_VERSION}/@me/chat/${serverId}/${channelId[x]}`)
                    )}> <span className="ml-[10px] mr-[15px] text-otherColor text-opacity-[60%]">#</span>{channelName}</button>
                  )
                })}
        </div>
      )
  }
