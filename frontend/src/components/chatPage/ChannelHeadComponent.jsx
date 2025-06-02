import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import memberListIcon from "/memberList.png?url"
export default function ChannelHeadComponent({setmemberListDisplay,memberListDisplay}){
    const parms = useParams();
    const [channelName,setchannelName]=useState("");

    async function getUserData() {
        const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`,{
            withCredentials: true,
        });
        const userId = userData.data.userId;
        return userId;
    }

    async function getChannelData() {
    const userId = await getUserData();
        if(parms.channelId){
        const channelNameData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/channelData/${ parms.serverId}/${parms.channelId}/${userId}`,{
            withCredentials: true,
        });
        setchannelName(channelNameData.data.channelName)
        }
    }

    useEffect(() => {
        getChannelData()
        
        return () => {
          setchannelName("")
        }
    }, [parms.serverId,parms.channelId])

    return(
        <div className="bg-primaryColor w-[100%] min-h-[45px] border-solid border-b-[1px] border-secondaryColor font-medium text-[30px] pl-[20px] flex relative">
            <span className="hover:text-otherColor duration-[0.5s]"> # {channelName} </span>
            <button className="absolute end-0 text-[20px] h-[100%] pl-[15px] pr-[15px] rounded-[5px] hover:bg-otherColor hover:bg-opacity-[10%] " onClick={()=>{setmemberListDisplay(memberListDisplay?false:true)}}>
            <img src={memberListIcon} alt="memberListIcon" />
            </button>
        </div>
    )
}