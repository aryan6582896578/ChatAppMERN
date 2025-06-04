import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";

export function UserSettingComponent({setuserLogoutBoxDisplay}){
    const navigate = useNavigate();
    const[username,setusername]=useState("");
    async function getUserData() {
        try {
        const userData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`, {
            withCredentials: true,
        })
        if(userData){
            setusername(userData.data.username);    
        }
        } catch (error) {
        console.log(error,"error get server list");
        }
    }
    function logoutUser(){
        document.cookie = "tokenJwt=;max-age=0; path=/;"
        navigate("/")
    }
    useEffect(() => {
      getUserData()
    }, [])
    document.title =`Settings | ${import.meta.env.VITE_NAME}`
    return (
      <div className="w-[100%] h-[100%] fixed top-[0px] left-0 bg-primaryColor z-[10]">
        <div className="bg-secondaryColor h-[70px] w-[100%]  border-b-otherColor border-opacity-[80%] border-b-[1px] relative ">
          <div className="flex">
            <div className="text-[30px] text-otherColor font-semibold ml-[10px] mt-[10px]">
              User Setting
            </div>
            <div className="mt-[10px] ml-[10px] absolute end-[10px] md:end-[25px]">
              <a href="https://github.com/aryan6582896578/ChatAppMERN"target="_blank">
                <img src="/github-mark-white.svg" className="h-[50px] " />
              </a>
              
            </div>
            
            <div className="absolute end-[10px] top-[15px] hidden md:flex">
                <button className="min-w-[5px] min-h-[40px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]"onClick={() => {
                setuserLogoutBoxDisplay(false)
              }}
            />
            </div>
          </div>
          
        </div>
        <div className="w-[100%] h-[100%] ">
          <div className="text-[35px] overflow-hidden break-words ">
            <div className="text-otherColor font-bold text-center">
              Hello <span className="font-semibold text-textColor animate-pulse">{username}</span>
            </div>
          </div>
          <div className="flex justify-evenly">
            <button className="bg-red-500 font-medium text-[25px] w-[250px] h-[50px]  text-otherColor hover:bg-red-500 hover:bg-opacity-[80%] mt-auto mb-auto rounded-[5px] mr-[10px]" onClick={()=>{
            logoutUser()
          }}>logout</button>
          </div>
          
        </div>
      </div>
    );
}