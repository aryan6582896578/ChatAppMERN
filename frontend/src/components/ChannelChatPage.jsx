import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { socket } from "./socket.js";
import LoadingPage from "./loadingPage.jsx";

export default function ChannelChatPage() {
  let navigate = useNavigate();
  const [userName, setuserName] = useState("someshitisseriouslywrong");
  const [channelList, setchannelList] = useState([]);
  const [userListId, setuserListId] = useState([]);
  const [userListUsername, setuserListUsername] = useState([]);
  const [inputFieldValue, setinputFieldValue] = useState("");
  const [connectionStatus,setconnectionStatus] = useState(false);
  const [createServerDisplay,setcreateServerDisplay] = useState(false)
  const[createServerData,setcreateServerData]=useState({serverName:""})
  const[s,ss]=useState([]);
  async function ServerData(){
    // setcreateServerData({serverName:"hi"})
    console.log(createServerData.serverName)
    sendData()
  }
  const sendData = async () => {
    const url = `http://localhost:4500/${import.meta.env.VITE_VERSION}/me/createServer`
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(createServerData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json  = await response.json();
      if(json.status==="CreatedServer"){
        setcreateServerDisplay(false)
        await navigate(`${import.meta.env.VITE_VERSION}/me/chat/${json.serverId}`)
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/userdata`, {
        withCredentials: true,
      }).then((data) => {
        setchannelList(data.data.channels), setuserName(data.data.username);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
    let url = String(window.location.pathname);
    let idurl = url.replace("/v1/me/chat/", "");
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/getChannelData/${idurl}`,{
          withCredentials: true,
        }).then((data) => {
        setuserListId(Object.keys(data.data.channelData));
        setuserListUsername(Object.values(data.data.channelData));
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }, []);
  const path = document.URL.split("chat/")[1];
  useEffect(() => {

    
      socket.on(`${path}`, (message) => {
        console.log("hmmm", message);
        ss((a)=>[...a,message])
      });
    

    function getJWTToken() {
      const match = document.cookie.match(/(?:^|;\s*)tokenJwt=([^;]*)/);
      return match ? match[1] : null;
    }
    // try {
     function something(){
      const jwt = getJWTToken();
      socket.auth = { path, jwt };
      socket.connect()
      socket.on("connect", () => {
        setconnectionStatus(true)
      });
      
     }
     something();


    return () => {
      socket.disconnect();
      ss("")
    };
  }, [path]);
 
  function inputFieldData(e) {
    e.preventDefault();
    socket.emit(`${path}`, inputFieldValue);
    setinputFieldValue("");
  }

  return (
    connectionStatus?
    // <div className="bg-primaryColor min-h-screen w-full  text-textColor flex ">
    //   <div className=" h-[100vh] min-w-[4%] max-w-[70px] bg-primaryColor  text-textColor overflow-y-auto overflow-x-hidden ">
    //     <div className="flex">
    //       <button
    //         onClick={() => {
    //           navigate(`/${import.meta.env.VITE_VERSION}/me/chat`);
    //         }}
    //         className="min-w-[5px] min-h-[30px] bg-textColor mt-[10px] hover:cursor-pointer hover:bg-text3Color mb-[25px] ml-auto mr-auto"
    //       ></button>
    //     </div>
    //     <div className="flex flex-col">
    //       {channelList?.map((channel, index) => (
    //         <div key={index} className="m-auto">
    //           <button
    //             key={index}
    //             onClick={() => {
    //               navigate(
    //                 `/${import.meta.env.VITE_VERSION}/me/chat/${channel}`
    //               );
    //             }}
    //             className="bg-textColor bg-opacity-20 text-[20px] border-transparent border-solid border-[2px] text-text1Color w-[50px] h-[50px] m-auto mb-[10px] rounded-[50px] hover:border-textColor hover:bg-transparent hover:text-otherColor"
    //           >
    //             c{index}
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    <div className="bg-primaryColor min-h-screen w-full  text-textColor flex  ">
      {createServerDisplay? <div className="w-max h-max bg-textColor bg-opacity-10 border-solid border-[1px] rounded-[5px] p-[10px] border-textColor right-[40%]  top-1/3  fixed z-[100]" id="createServer">
      <div className="text-center text-otherColor text-[30px]" >Create Server</div>
        <input onChange={(e)=>{
          setcreateServerData({serverName:e.target.value})
        }} type="text" className="bg-textColor w-[300px] bg-opacity-40 rounded-[5px] h-[40px] outline-none mt-[10px] text-otherColor p-[10px]" placeholder="server name" />
        <div className="flex mt-[10px] justify-evenly"> 
          <button onClick={()=>{setcreateServerDisplay(false)}} className="w-[100px] bg-text3Color bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-text3Color hover:bg-opacity-25 " >Cancel</button> 
          <button  onClick={()=>{
            ServerData()
          }} className="w-[100px] bg-text1Color bg-opacity-100 Color rounded text-textColor h-[40px] border-solid border-[2px] border-text1Color hover:bg-opacity-25 hover:text-text1Color " >Create</button>
        </div>  
      </div>:""}
     
      <div className=" h-[100vh] min-w-[60px] max-w-[70px] bg-primaryColor  text-textColor overflow-y-auto overflow-x-hidden relative ">
          <div className="flex">
            <button onClick={()=>{navigate(`/${import.meta.env.VITE_VERSION}/me/chat`)}} className="min-w-[5px] min-h-[30px] bg-textColor mt-[10px] hover:cursor-pointer hover:bg-text3Color mb-[25px] ml-auto mr-auto"></button>
          </div>
          <div className="flex flex-col relative ">
            {channelList.map((channel, index) => (
              <div key={index} className="m-auto">
                <button key={index} onClick={()=>{
                  navigate(`/${import.meta.env.VITE_VERSION}/me/chat/${channel}`)
                }} className="bg-textColor bg-opacity-20 text-[20px] border-transparent border-solid border-[2px] text-text1Color w-[50px] h-[50px] m-auto mb-[10px] rounded-[50px] hover:border-textColor hover:bg-transparent hover:text-otherColor" >
                  s{index}
                </button>     
              </div> 
            ))}
            <button onClick={()=>{
              setcreateServerDisplay(true)
            }} className="bg-secondaryColor text-[25px] p-[0px] border-secondaryColor border-solid border-[2px] text-otherColor w-[50px] h-[50px] m-auto mb-[10px] rounded-[50px] hover:border-otherColor hover:border-opacity-50 hover:bg-transparent hover:text-otherColor">+</button> 
        
          </div>
      </div>
      <div className="bg-secondaryColor w-[16%] text-otherColor relative h-[100vh] ">
        <div className="w-[100%] h-[95%] overflow-y-auto overflow-x-hidden">
          channels
        </div>
        <div className="w-[100%] h-[5%] bg-primaryColor absolute bottom-[0px] rounded-[5px] text-[25px]  pl-[10px] hover:rounded-none hover:cursor-pointer">
          <div className="flex relative w-full h-full">
            <span className="hover:text-text3Color">{userName}</span>
            <div className="min-w-[5px] min-h-[100%] bg-textColor hover:bg-text3Color absolute right-[0px] bottom-[0px] hover:cursor-not-allowed "></div>
          </div>
        </div>
      </div>

      <div className="bg-primaryColor w-[65%] p-[10px] pb-[10px]  flex flex-col ">
        <div className="bg-primaryColor w-[100%] h-[95%] mb-[0px]" id="aa">
          {
          s?  s.map((x,y)=>{
            return(<div key={y}>{x}</div>)
          }):""
        }
        </div>
        <div className="h-[5%]  w-[100%]">
          <form onSubmit={inputFieldData} className="h-[100%]  w-[100%]">
            <input
              id="inputField"
              onChange={(e) => {
                setinputFieldValue(e.target.value);
              }}
              value={inputFieldValue}
              className="bg-secondaryColor outline-none text-otherColor w-[100%] h-[100%] rounded-[5px] p-[5px] overflow-y-auto break-words text-wrap flex-wrap overflow-x-hidden"
            />
          </form>
        </div>
      </div>

      <div className="bg-secondaryColor w-[15%] max-h-[100vh] pb-[20px]">
        <div className="bg-primaryColor m-[10px] p-[10px] rounded-[5px] bg-opacity-70 min-h-[100%]  overflow-y-auto overflow-x-hidden">
          <div className="text-[25px] font-bold text-center mb-[10px] ">
            MEMBERS
          </div>

          <div>
            {userListId?.map((channel, index) => (
              <div
                key={channel}
                className="m-auto text-text2Color text-[20px]  "
              >
                <div className="w-[100%] p-[5px] hover:text-text1Color hover:cursor-not-allowed ">
                  {userListUsername[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>:<LoadingPage someError={`server offline`}/>
    
  );
}
