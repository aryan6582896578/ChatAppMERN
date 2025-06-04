import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { UserSettingComponent } from "./UserSettingComponent";
export function UserProfileComponent() {
  const navigate = useNavigate();
  
  const[username,setusername] = useState("someshitisseriouslywrong")
  const[userLogoutBoxDisplay,setuserLogoutBoxDisplay]=useState(false)

  async function getUserData() {
    const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/username`, {
        withCredentials: true,
      })
      setusername(userData.data.username)
  }
  useEffect(() => {
    
    getUserData()
    
  }, [])
 
    return (
      <div className=" min-w-[250px] max-w-[250px] max-h-[55px] min-h-[55px] bg-primaryColor hidden sm:flex border-solid border-t-[1px] border-secondaryColor relative">
        <div className="text-[25px] p-[5px] font-semibold hover:text-otherColor hover:cursor-pointer"> {username}</div>
        <button className="min-w-[5px] min-h-[100%] bg-textColor hover:bg-text3Color rounded-[0px] absolute end-0" onClick={()=>{
          setuserLogoutBoxDisplay(true)
        }}/>
            {userLogoutBoxDisplay? <UserSettingComponent setuserLogoutBoxDisplay={setuserLogoutBoxDisplay} /> :""}

      </div>
    );
  }