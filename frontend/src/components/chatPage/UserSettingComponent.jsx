import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function UserSettingComponent() {
  const navigate = useNavigate();
  const path = document.URL.split("chat/")[1];
  const[username,setusername] = useState("someshitisseriouslywrong")
  function getUserData() {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/userdata`, {
        withCredentials: true,
      }).then((data) => {
        setusername(data.data.username);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }
  useEffect(() => {
    
    getUserData()
    
  }, [path])
    return (
      <div className=" min-w-[250px] max-h-[55px] min-h-[55px] bg-secondaryColor z-100 absolute bottom-[0px] flex ">
        <div className="text-[25px] p-[5px] font-semibold hover:text-otherColor hover:cursor-cell "> {username}</div>
        <button className="min-w-[5px] min-h-[100%] bg-textColor hover:bg-text3Color rounded-[0px] absolute end-0 hover:cursor-cell "/>
       
      </div>
    );
  }