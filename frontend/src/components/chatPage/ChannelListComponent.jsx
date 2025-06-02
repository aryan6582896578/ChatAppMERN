import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export default function ChannelListComponent(){
    const navigate = useNavigate();
    const parms = useParams();
    const[serverId,setserverId]=useState("")
    const [channelId, setchannelId] = useState([]);
    const [channelName, setchannelName] = useState([]);
    
    const [displayCreateChannelBox,setdisplayCreateChannelBox]=useState(false)
    const [createChannelName,setcreateChannelName] = useState({channel:""})
    const [adminCheck,setadminCheck]=useState(false)

    async function postCreateChannel(){
      if(createChannelName){
        const createServerChannel = await axios.post(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/me/createChannel/${parms.serverId}`,createChannelName,{
        withCredentials: true
      })
      if(createServerChannel.data.status==="channelCreated"){
        setdisplayCreateChannelBox(false)
        navigate(`/${import.meta.env.VITE_VERSION}/@me/chat/${serverId}/${createServerChannel.data.channelId}`)
      }else if(createServerChannel.data.status==="invalidUser" || createServerChannel.data.status==="invalidData"){
        navigate(`/${import.meta.env.VITE_VERSION}/@me/chat`)
      }
      }
    }
    async function getUserData(){
        const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`, {
          withCredentials: true,
        })
        setserverId(parms.serverId)
        const userId = userData.data.userId
        return userId
      }

    async function getChannelData() {
      const userId = await getUserData()

        const channelList = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/channelList/${parms.serverId}/${userId}`,{
            withCredentials: true,
          })
          
          setchannelId(Object.keys(channelList.data.channelList))
          setchannelName(Object.values(channelList.data.channelList))
          
    }
    async function getServerData() {
    
    const adminStatus = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/serverAdmin/${parms.serverId}`,{
        withCredentials: true,
    })
    
    if(adminStatus.data.adminStatus===true){
      setadminCheck(true)
    }
    
   
  }
    useEffect(() => {
      getServerData()
      getChannelData()
      return () => {
        setserverId("")
        setchannelId([])
        setchannelName([])
      }
    }, [parms.serverId,parms.channelId])


    
      return(
          <div className="max-w-[250px] h-[100%] mb-[55px] mt-[45px] flex flex-col pt-[10px] relative">   
          <div className="text-[10px] font-bold ml-[5px] flex min-h-[20px] hover:underline hover:cursor-pointer text-otherColor text-opacity-[60%]">
            TEXT CHANNELS 
          {adminCheck?<button className="end-[0px] top-0 flex absolute font-bold text-[20px] hover:text-text1Color duration-[0.5s]" onClick={()=>{
              setdisplayCreateChannelBox(true)
            }}>
              +
            </button>:""}  
          </div>
                {channelName.map((channelName,x)=>{
                  return (
                    <button key={channelId[x]} className="flex text-[20px] m-[5px] rounded-[5px] mb-[5px] font-medium bg-otherColor bg-opacity-[4%] hover:text-otherColor duration-[0.5s] hover:bg-opacity-[5%]" onClick={()=>(
                     navigate(`/${import.meta.env.VITE_VERSION}/@me/chat/${serverId}/${channelId[x]}`)
                    )}> <span className="ml-[10px] mr-[15px] text-otherColor text-opacity-[60%]">#</span>{channelName} </button>
                  )
                })}
                {displayCreateChannelBox? <CreateChannelBox setdisplayCreateChannelBox={setdisplayCreateChannelBox} postCreateChannel={postCreateChannel} setcreateChannelName={setcreateChannelName} createChannelName={createChannelName}/>:""}
        </div>
       
      )
  }

  function CreateChannelBox({setdisplayCreateChannelBox,postCreateChannel,setcreateChannelName,createChannelName}){
    
    return(
        <div className="w-[500px]  bg-textColor bg-opacity-[33%] left-[30%] top-[30%] fixed z-10 text-otherColor rounded-[10px] ">
      <div className="flex align-middle justify-center mb-[10px] pt-[10px]">
        <div className="text-[40px] font-medium">Create Channel</div>
        <button
          className="end-2 top-2 absolute min-w-[5px] min-h-[30px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]"
          onClick={() => {
            setdisplayCreateChannelBox(false)
          }}
        />
      </div>
      <div className="w-[100%] flex">
        <div className="bg-textColor rounded-[5px] w-[60%] ml-auto mr-auto content-center flex mb-[20px] bg-opacity-[20%] border-solid border-[2px] border-transparent hover:border-textColor duration-[0.5s] ">
           <span className="text-[30px] ml-[5px] mr-[5px] opacity-[80%] ">#</span>
           <input className="w-[100%] h-[100%] outline-none bg-transparent text-[25px] text-otherColor " maxLength={15} placeholder="General" required onChange={(e)=>{
            setcreateChannelName({...createChannelName , channel:e.target.value})
           }}/> 
        </div>
        
      </div>
      <div className="flex justify-evenly text-[20px]">
        <button
          className="w-[200px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s] font-medium"
          onClick={() => {
            postCreateChannel()
            setcreateChannelName("")
            
          }}  
        >
          Create Channel
        </button>
      </div>
    </div>
    )
  }