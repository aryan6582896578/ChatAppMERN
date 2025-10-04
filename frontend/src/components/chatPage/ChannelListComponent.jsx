import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export default function ChannelListComponent({setchatBoxDisplay,setserverListDisplay,setchannelListDisplay,setbottomBarDisplay}){
    const navigate = useNavigate();
    const parms = useParams();
    const[serverId,setserverId]=useState("")
    const [channelId, setchannelId] = useState([]);
    const [channelName, setchannelName] = useState(["Loading..."]);
    
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
        setcreateChannelName("")
        setserverId("")
        setchannelId([])
        setchannelName([])
      }
    }, [parms.serverId,parms.channelId])


    
      return(
          <div className=" sm:w-[250px] h-[100%]  flex flex-col pt-[10px] relative bg-primaryColor">   
          <div className=" text-[10px] font-bold ml-[5px] flex min-h-[20px] hover:underline hover:cursor-pointer text-otherColor text-opacity-[60%]">
            TEXT CHANNELS 
          {adminCheck?<button className="end-[0px] top-0 flex absolute font-bold text-[20px] hover:text-text1Color duration-[0.5s]" onClick={()=>{
              setdisplayCreateChannelBox(true)
            }}>
              +
            </button>:""}  
          </div>
                {channelName.map((channelName,x)=>{
                  return (
                    <button key={x} className="flex text-[20px] m-[5px] ml-[1px] rounded-[5px] mb-[5px] font-medium bg-otherColor bg-opacity-[5%] hover:text-otherColor duration-[0.5s] hover:bg-opacity-[5%] overflow-clip " onClick={()=>{
                     navigate(`/${import.meta.env.VITE_VERSION}/@me/chat/${serverId}/${channelId[x]}`)
                     setchatBoxDisplay("flex")
                     setserverListDisplay("hidden")
                     setchannelListDisplay("hidden")
                     setbottomBarDisplay(false)
                    }}> <span className="ml-[10px] mr-[10px] text-otherColor text-opacity-[60%]">#</span>{channelName} </button>
                  )
                })}
                {displayCreateChannelBox? <CreateChannelBox setdisplayCreateChannelBox={setdisplayCreateChannelBox} postCreateChannel={postCreateChannel} setcreateChannelName={setcreateChannelName} createChannelName={createChannelName}/>:""}
        </div>
       
      )
  }

  function CreateChannelBox({setdisplayCreateChannelBox,postCreateChannel,setcreateChannelName,createChannelName}){
    
    return(
        <div className="w-[100%] h-[100%] fixed top-[0px] left-0 bg-primaryColor z-[10]">
          <div className="bg-secondaryColor h-[70px] w-[100%]  border-b-otherColor border-opacity-[80%] border-b-[1px]">
            <div className="flex">
              <div className="mt-[10px] ml-[10px]">
                <a href="https://github.com/aryan6582896578/ChatAppMERN" target="_blank">
                  <img src="/github-mark-white.svg" className="h-[50%] "/>
                </a>
              </div>
              <div>
                <button className="end-[10px] top-[10px] absolute min-w-[5px] min-h-[45px] bg-red-500 rounded-[10px] hover:bg-text3Color duration-[0.5s]" onClick={() => {
                  setdisplayCreateChannelBox(false)
                }}/>
              </div>
            </div>   
          </div>

          <div className="flex h-[100%] w-[100%] flex-col md:w-[400px] md:ml-auto md:mr-auto">
            <div className="text-[35px] overflow-hidden break-words ">
                <div className="text-otherColor font-bold text-center">
                  Create Channel
                </div>
            </div>
            <div className="bg-textColor rounded-[5px] w-[90%] mt-[20px] ml-auto mr-auto content-center flex bg-opacity-[20%] border-solid border-[2px] border-transparent hover:border-textColor duration-[0.5s] ">
              <span className="text-[30px] ml-[5px] mr-[5px] opacity-[80%] ">#</span>
              <input className="w-[100%] h-[100%] outline-none bg-transparent text-[25px] text-otherColor " maxLength={15} placeholder="General" required onChange={(e)=>{
                setcreateChannelName({...createChannelName , channel:e.target.value})
              }}/> 
            </div>
            <div className="h-[100%] mt-[20px] text-otherColor pl-[20px] pr-[20px] text-[18px] w-[100%] ml-auto mr-auto ">
              <button
                className="w-[100%] h-[40px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor duration-[0.5s] font-semibold "
                onClick={() => {
                  postCreateChannel()
                  setcreateChannelName("")
                  
                }}  
              >
                Create Channel
              </button>
            </div>
          </div>

    </div>
    )
  }