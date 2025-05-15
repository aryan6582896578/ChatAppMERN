import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function UserSettingComponent() {
  const navigate = useNavigate();
  
  const[username,setusername] = useState("someshitisseriouslywrong")
  function getUserData() {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/username`, {
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
        <button className="min-w-[5px] min-h-[100%] bg-textColor hover:bg-text3Color rounded-[0px] absolute end-0 hover:cursor-not-allowed  "/>
       
      </div>
    );
  }