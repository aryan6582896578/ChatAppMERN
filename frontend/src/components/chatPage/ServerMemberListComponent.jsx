import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function ServerMemberListComponent(){
  const navigate = useNavigate();
  const path = document.URL.split("chat/")[1];
  const parms = useParams();
  console.log(parms)
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
        <div className="bg-primaryColor min-w-[250px] max-h-[100vh] border-solid border-l-[1px] border-secondaryColor flex flex-col">
    
          <div className="text-[25px] font-semibold text-center pb-[10px] mt-[10px] ">
            MEMBERS
          </div>

          <div className="bg-secondaryColor bg-opacity-[30%] m-[10px] mt-[0px] rounded-[5px] h-[100%] mb-[10px] flex flex-col" >
            {membersId?.map((userId, index) => (
            <div key={index} id={userId} > <div className="text-[20px] font-semibold m-[10px] mb-[0px] hover:text-otherColor min-h-[35px] max-h-[35px] text-center rounded-[5px] overflow-hidden ">{membersUsername[index]}</div>  </div>
            ))}
          </div>
     
      </div>
    )
}