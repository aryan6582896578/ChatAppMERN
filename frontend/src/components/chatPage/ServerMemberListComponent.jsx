import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function ServerMemberListComponent(){
  const navigate = useNavigate();
  const path = document.URL.split("chat/")[1];

  const [membersId, setmembersId] = useState([]);
  const [membersUsername, setmembersUsername] = useState([]);

  function getChannelData() {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/getChannelData/${path}`,{
          withCredentials: true,
        }).then((data) => {
          setmembersId(Object.keys(data.data.channelData.members));
          setmembersUsername(Object.values(data.data.channelData.members));
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }
  useEffect(() => {
    
    getChannelData()
    
  }, [path])
  
    return(
        <div className="bg-primaryColor min-w-[250px] max-h-[100vh] border-solid border-l-[1px] border-secondaryColor">
        <div className="bg-primaryColor min-h-[100%] overflow-y-auto overflow-x-hidden">
          <div className="text-[25px] font-semibold text-center pb-[20px] mt-[10px] ">
            MEMBERS
          </div>

          <div >
            {membersId?.map((userId, index) => (
<div key={index} id={userId} className="text-[20px] font-semibold pl-[5px] mb-[5px] flex hover:text-otherColor ">  {membersUsername[index]} </div>
))}
          </div>
        </div>
      </div>
    )
}