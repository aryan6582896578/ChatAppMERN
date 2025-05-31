import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function MemberListComponent(){
  const navigate = useNavigate();
  const parms = useParams();

  const [membersId, setmembersId] = useState([]);
  const [membersUsername, setmembersUsername] = useState([]);

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
      const channelMemberList = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/channelMemberList/${ parms.serverId}/${parms.channelId}/${userId}`,{
        withCredentials: true,
      });
      
      setmembersId(Object.keys(channelMemberList.data.usernameList))
      setmembersUsername(Object.values(channelMemberList.data.usernameList))
    }
    
  }
  
  useEffect(() => {
    
    getChannelData()
    
  }, [parms.serverId,parms.channelId])
  
    return(
        <div className="bg-primaryColor min-w-[250px] border-solid border-l-[1px] border-secondaryColor ">
          <div className="flex flex-col ">
            <div className="text-[20px] font-medium text-center pb-[10px] mt-[10px] ">
              MEMBERS
            </div>

            <div className="m-[10px] mt-[0px] rounded-[5px] h-[100%] mb-[10px] flex flex-col" >
              {membersId?.map((userId,x) => (
                
              <div key={membersId[x]} id={userId} > 
                <div className="text-[20px] font-medium m-[10px] mb-[0px] text-otherColor text-opacity-[60%] hover:text-otherColor min-h-[35px] max-h-[35px] text-center overflow-hidden duration-[0.5s] cursor-pointer">
                  {membersUsername[x]}
                </div>  
              </div>
              ))}
            </div>
          </div>
          
     
      </div>
    )
}