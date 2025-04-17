import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function ServerListComponent() {
  const navigate = useNavigate();
  const path = document.URL.split("chat/")[1];
  const [serverList, setserverList] = useState([]);

  const [serverBoxDisplay ,setserverBoxDisplay] = useState(false);

  const [serverCreateBoxDisplay,setserverCreateBoxDisplay] = useState(false);
  const [createServerData, setcreateServerData] = useState({ serverName: "" });

  const [serverJoinBoxDisplay,setserverJoinBoxDisplay]=useState(false);
  const[joinServerData , setjoinServerData] =  useState({ serverInviteCode: "" });
  const[serverJoinError,setserverJoinError]=useState("");

  function getUserData() {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/userdata`, {
        withCredentials: true,
      }).then((data) => {
        setserverList(data.data.serverList);
      }).catch(function (error) {
        console.log(error.toJSON() , "userdata fetch serverlistcomponent");
      });
  }

  async function postCreateServer(){
    if(createServerData.serverName){
      axios.post(`http://localhost:4500/${import.meta.env.VITE_VERSION}/me/createServer`,createServerData,{
        withCredentials: true
      }).then(async (data)=>{
        if(data.data.status==="CreatedServer"){
          setserverCreateBoxDisplay(false);
          setcreateServerData("")
          await navigate(`/${import.meta.env.VITE_VERSION}/me/chat/${data.data.serverId}`);
        }
      })
    }
  }

  async function postJoinServer(){
    if(joinServerData.serverInviteCode){
      axios.post(`http://localhost:4500/${import.meta.env.VITE_VERSION}/me/joinServer`,joinServerData,{
        withCredentials: true
      }).then(async (data)=>{
        console.log(data.data)
        if(data.data.status==="alreadyJoined"){
          setserverJoinBoxDisplay(false)
          await navigate(`/${import.meta.env.VITE_VERSION}/me/chat/${data.data.serverId}`);
        }else if(data.data.status==="ServerJoined"){
          await navigate(`/${import.meta.env.VITE_VERSION}/me/chat/${data.data.serverId}`);
        }else{
          setserverJoinError("*invalid code")
          
        }
      })
    }
  }
  useEffect(() => {
    getUserData();
    setserverBoxDisplay(false);
    setserverCreateBoxDisplay(false);
    setserverJoinBoxDisplay(false);
  },[path]);

  return (
    <div className=" h-[100vh] min-w-[60px] max-w-[70px] bg-primaryColor  text-textColor overflow-y-auto overflow-x-hidden relative ">

      <div className="flex">
        <button
          onClick={() => {
            navigate(`/${import.meta.env.VITE_VERSION}/me/chat`);
          }}
          className="min-w-[5px] min-h-[30px] bg-textColor mt-[15px] hover:cursor-pointer hover:bg-text3Color  ml-auto mr-auto rounded-[10%]"
        />
      </div>

      <div className="flex flex-col relative pt-[20px]">
        {serverList.map((server, index) => (
          <div key={index} className="m-auto">
            <button key={index} onClick={() => {
                navigate(`/${import.meta.env.VITE_VERSION}/me/chat/${server}`);
              }}
              className="text-[20px] bg-secondaryColor bg-opacity-30 border-transparent border-solid border-[2px] text-otherColor w-[50px] h-[50px] m-auto mb-[10px] rounded-[50px] hover:border-textColor  hover:text-otherColor"
            >{index}</button>
          </div>
        ))}

        <button
          onClick={() => {
            setserverBoxDisplay(true);
          }}
          className="text-[20px] bg-secondaryColor bg-opacity-30 border-transparent border-solid border-[2px] text-otherColor w-[50px] h-[50px] m-auto mb-[10px] rounded-[50px] hover:border-textColor  hover:text-otherColor">
          +
        </button>
        
      </div>

  {serverBoxDisplay?<ServerBoxDisplay  setserverBoxDisplay={setserverBoxDisplay} setserverCreateBoxDisplay={setserverCreateBoxDisplay} setserverJoinBoxDisplay={setserverJoinBoxDisplay}/>:"" }
  {serverCreateBoxDisplay ? <ServerCreateBoxDisplay setserverBoxDisplay={setserverBoxDisplay} setserverCreateBoxDisplay={setserverCreateBoxDisplay} setcreateServerData={setcreateServerData} createServerData={createServerData} postCreateServer={postCreateServer}/> :"" }
  {serverJoinBoxDisplay ?<ServerJoinBoxDisplay setserverJoinBoxDisplay={setserverJoinBoxDisplay} setserverBoxDisplay={setserverBoxDisplay} setjoinServerData={setjoinServerData}  joinServerData={joinServerData} serverJoinError={serverJoinError} postJoinServer={postJoinServer}/>:""}
    </div>
    
  );
}

function ServerBoxDisplay({setserverBoxDisplay ,setserverCreateBoxDisplay ,setserverJoinBoxDisplay}){

    return(
        <div className="w-[500px]  bg-textColor bg-opacity-[33%] left-[30%] top-[30%] fixed z-10 text-otherColor rounded-[10px] ">
            <div className="flex align-middle justify-center mb-[10px] pt-[10px]"> 
                <div className="text-[40px]">Server</div>
                <button className="end-2 top-2 absolute min-w-[5px] min-h-[30px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]" onClick={() => {
                    setserverBoxDisplay(false);
                }}/>
            </div>
            <div className="flex justify-evenly text-[20px]">
                <button className="w-[150px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s]" onClick={()=>{ 
                  setserverBoxDisplay(false) ,
                  setserverCreateBoxDisplay(true)
                  }}>Create Server</button>
                <button className="w-[150px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s]" onClick={()=>{
                  setserverBoxDisplay(false) ,
                  setserverJoinBoxDisplay(true)
                }} >Join Server</button>
            </div>
        </div>
    )
}

function ServerCreateBoxDisplay({setserverBoxDisplay,setserverCreateBoxDisplay ,setcreateServerData ,createServerData ,postCreateServer}){

  return(
      <div className="w-[500px]  bg-textColor bg-opacity-[33%] left-[30%] top-[30%] fixed z-10 text-otherColor rounded-[10px] ">
          <div className="flex align-middle justify-center mb-[10px] pt-[10px]"> 
              <div className="text-[40px]">Create Server</div>
              <button className="end-2 top-2 absolute min-w-[5px] min-h-[30px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]" onClick={() => {
                  setserverCreateBoxDisplay(false);
              }}/>
          </div>
          <div className="flex justify-center pb-[20px]">
          <input
         onChange={(e) => {
          setcreateServerData({...createServerData,serverName:e.target.value});
         }}
          type="text" className="bg-textColor w-[400px] bg-opacity-40 rounded-[5px] h-[50px] outline-none mt-[10px] text-otherColor p-[10px]" placeholder="server name"
        />
          </div>
          <div className="flex justify-evenly text-[20px]">
              <button className="w-[150px] h-fit p-[10px] mb-[20px] bg-text3Color rounded-[10px] border-solid border-[3px] border-transparent hover:bg-red-500 hover:border-red-500 transition-[1s]" onClick={()=>(
                setserverCreateBoxDisplay(false),
                setserverBoxDisplay(true)
              )}>Go back</button>
              <button className="w-[150px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s]" onClick={()=>{
                postCreateServer()
              }}>Create Server</button>

          </div>
      </div>
  )
}

function ServerJoinBoxDisplay({setserverJoinBoxDisplay,setserverBoxDisplay ,setjoinServerData,joinServerData ,serverJoinError,postJoinServer}){
  return(
    <div className="w-[500px]  bg-textColor bg-opacity-[33%] left-[30%] top-[30%] fixed z-10 text-otherColor rounded-[10px] ">
    <div className="flex align-middle justify-center mb-[10px] pt-[10px]"> 
        <div className="text-[40px]">Join Server</div>
        <button className="end-2 top-2 absolute min-w-[5px] min-h-[30px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]" onClick={() => {
            setserverJoinBoxDisplay(false)
        }}/>
    </div>
    <div className="flex align-middle justify-center text-text3Color">{serverJoinError}</div>
    <div className="flex justify-center pb-[20px]">
    <input
   onChange={(e) => {
    setjoinServerData({...joinServerData,serverInviteCode:e.target.value});
   }}
    type="text" className="bg-textColor w-[400px] bg-opacity-40 rounded-[5px] h-[50px] outline-none mt-[10px] text-otherColor p-[10px] font-bold text-[20px]" placeholder="Invite Code" maxLength={8}
  />
    </div>
    <div className="flex justify-evenly text-[20px]">
        <button className="w-[150px] h-fit p-[10px] mb-[20px] bg-text3Color rounded-[10px] border-solid border-[3px] border-transparent hover:bg-red-500 hover:border-red-500 transition-[1s]" onClick={()=>(
          setserverJoinBoxDisplay(false),
          setserverBoxDisplay(true)
        )}>Go back</button>
        <button className="w-[150px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s]" onClick={()=>{
          postJoinServer()
        }}>Join Server</button>

    </div>
</div>
  )
}
