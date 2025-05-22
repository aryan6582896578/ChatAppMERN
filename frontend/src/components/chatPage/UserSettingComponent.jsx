import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function UserSettingComponent() {
  const navigate = useNavigate();
  
  const[username,setusername] = useState("someshitisseriouslywrong")
  const[userLogoutBoxDisplay,setuserLogoutBoxDisplay]=useState(false)
  function logoutUser(){
    document.cookie = "tokenJwt=;max-age=0; path=/;"
    navigate("/")
  }
  function getUserData() {
    axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/username`, {
        withCredentials: true,
      }).then((data) => {
        setusername(data.data.username);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }
  useEffect(() => {
    
    getUserData()
    
  }, [])
    return (
      <div className=" min-w-[250px] max-w-[250px] max-h-[55px] min-h-[55px] bg-primaryColor z-100 absolute bottom-[0px] flex ">
        <div className="text-[25px] p-[5px] font-semibold hover:text-otherColor hover:cursor-pointer"> {username}</div>
        <button className="min-w-[5px] min-h-[100%] bg-textColor hover:bg-text3Color rounded-[0px] absolute end-0" onClick={()=>{
          setuserLogoutBoxDisplay(true)
        }}/>

   {userLogoutBoxDisplay?      <div className="w-[500px] h-[90px] bg-textColor bg-opacity-[33%] left-[30%] top-[30%] fixed z-10 text-otherColor rounded-[10px] ">
        <div className="flex align-middle justify-center mb-[10px] pt-[10px]">
          <button className="end-2 top-2 absolute min-w-[5px] min-h-[30px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]"
            onClick={() => {
              setuserLogoutBoxDisplay(false)
            }}
          />
        </div>
     
      <div className="flex justify-evenly text-[20px]">
       <button className="bg-red-500 font-medium text-[25px] w-[50%] h-[50px] text-otherColor hover:bg-red-500 hover:bg-opacity-[80%] mt-auto mb-auto rounded-[5px] mr-[10px]" onClick={()=>{
        logoutUser()
       }}>logout</button>
      </div>
    </div>:""}

      </div>
    );
  }