import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
export default function ChatPage() {
  let navigate = useNavigate();
    const [userName, setuserName] = useState("someshitisseriouslywrong")


  useEffect(() => {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/userdata`,{ withCredentials: true })
      .then((data) => {console.log(data.data.username) , setuserName(data.data.username)})
      .catch(function (error) {
        console.log(error.toJSON());
      });
  }, []);

  return (
    <div className="bg-primaryColor min-h-screen w-full  text-textColor flex ">
  
    <div className=" h-[100vh] min-w-[50px] max-w-[100px] bg-white ">   {/*overflow-y-scroll overflow-x-hidden */}
      <button className="w-[100%] h-[100%] hover:cursor-not-allowed" ></button>
    </div>
    <div className="bg-textColor min-w-[200px] h-[100vh] text-otherColor">Welcome {userName}</div>
    <div className="bg-secondaryColor min-w-[600px]"></div>
    <div className="w-[100%]"></div>
    </div>
  );
}
