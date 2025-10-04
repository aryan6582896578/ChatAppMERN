import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function ServerSettingComponent() {
  const navigate = useNavigate();
  const parms = useParams();
  const [serverData, setserverData] = useState("Loading...");
  const [serverSettingBoxDisplay, setserverSettingBoxDisplay] = useState(false);
  const [serverSettingInviteBoxDisplay, setserverSettingInviteBoxDisplay] =useState(false);
  const [ adminCheck , setadminCheck] = useState(false)

  const [inviteCode, setinviteCode] = useState(false);
  const [inviteCodeStatus,setinviteCodeStatus]= useState("Copy Code");
  async function createServerInvite() {
      const getInviteCode = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/inviteCode/${parms.serverId}`,{
          withCredentials: true,
        })
        if(getInviteCode.data.status==="created"){
          setinviteCode(getInviteCode.data.inviteCode) 
        }else if(getInviteCode.data.status==="notAdmin" || getInviteCode.data.status==="invalidData" ){
          setserverSettingBoxDisplay(false)
          setserverSettingInviteBoxDisplay(false)
        }     
  }
  async function checkAdmin(){
     const adminStatus = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/serverAdmin/${parms.serverId}`,{
        withCredentials: true,
    })
    
    if(adminStatus.data.adminStatus===true){
      setadminCheck(true)
      return true
    }else{
      setadminCheck(false)
      return false
    }
  }

  function getServerData() {
    axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/getServerData/${parms.serverId}`,{
        withCredentials: true,
    }).then((data) => {

        setserverData(data.data.serverData.name);
      }).catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    createServerInvite()
    checkAdmin()
    getServerData();
    setserverSettingBoxDisplay(false);
    setserverSettingInviteBoxDisplay(false);
    return ()=>{
      setinviteCodeStatus("Copy Code")
    }
  },[parms.serverId,parms.channelId]);
  
  document.title =`${serverData} | ${import.meta.env.VITE_NAME}`
  return (
    <div className="sm:w-[250px] h-[45px] bg-primaryColor relative flex overflow-hidden flex-col ">
      <div className="text-[20px] p-[5px] font-semibold hover:text-otherColor hover:cursor-pointer duration-[0.5s]">
        {serverData}
      </div>
          {adminCheck? <button className={`min-w-[5px] min-h-[100%] absolute end-0 bg-textColor hover:bg-text3Color rounded-[10%]  hover:cursor-pointer duration-[0.5s]`}onClick={() => {
          setserverSettingBoxDisplay(true);
        }}
      />: <button className={`min-w-[5px] min-h-[100%] absolute end-0 bg-textColor hover:bg-otherColor hover:bg-opacity-[50%] rounded-[10%] hover:cursor-pointer duration-[0.5s]`}
      />}
      {serverSettingBoxDisplay ? (<ServerSettingBoxDisplay setserverSettingBoxDisplay={setserverSettingBoxDisplay} setserverSettingInviteBoxDisplay={setserverSettingInviteBoxDisplay} createServerInvite={createServerInvite}/>) : ("")}
      {serverSettingInviteBoxDisplay ? (<ServerSettingInviteBoxDisplay setserverSettingInviteBoxDisplay={setserverSettingInviteBoxDisplay} inviteCode={inviteCode} inviteCodeStatus={inviteCodeStatus} setinviteCodeStatus={setinviteCodeStatus}/>) : ("")}
    </div>
  );
}

function ServerSettingBoxDisplay({setserverSettingBoxDisplay,setserverSettingInviteBoxDisplay,createServerInvite}) {
  return (
    <div className="fixed w-[100%] h-screen bg-primaryColor top-[0px] bg-opacity-[99%] z-[1000] end-0">
      <div className="bg-secondaryColor h-[70px] w-[100%]  border-b-otherColor border-opacity-[80%] border-b-[1px]">
        <div className="flex">
          <div className="mt-[10px] ml-[10px]">
            <a href="https://github.com/aryan6582896578/ChatAppMERN" target="_blank">
              <img src="/github-mark-white.svg" className="h-[50%] "/>
            </a>
          </div>
          <div>
            <button className="end-[10px] top-[10px] absolute min-w-[5px] min-h-[45px] bg-red-500 rounded-[10px] hover:bg-text3Color duration-[0.5s]" onClick={() => {
              setserverSettingBoxDisplay(false);
              }}/>
          </div>
        </div>   
      </div>
          <div className="flex h-[100%] w-[100%] flex-col md:w-[400px] md:ml-auto md:mr-auto">

           <div className="text-[35px] overflow-hidden break-words h-[fit]">
            <div className="text-otherColor font-bold text-center">
              Invite Code
            </div>
           </div>

            <div className=" flex flex-col h-[100%]">
              <div className="ml-auto mr-auto mt-[10px]">
                <button
                  className="w-[150px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s]"
                  onClick={() => {
                    setserverSettingBoxDisplay(false),
                      setserverSettingInviteBoxDisplay(true);
                      createServerInvite()
                  }}>
                  Invite Code
                </button>
              </div>

            </div>
          </div>
    </div>
  );
}

function ServerSettingInviteBoxDisplay({ setserverSettingInviteBoxDisplay ,inviteCode ,inviteCodeStatus,setinviteCodeStatus}) {
  const [color,setcolor]=useState("textColor")
  const [opacity,setopacity]=useState("")
  const [ border,setborder]=useState("textColor")
  return (
    <div className="fixed w-[100%] h-screen bg-primaryColor top-[0px] bg-opacity-[99%] z-[1000] end-0">
      <div className="bg-secondaryColor h-[70px] w-[100%]  border-b-otherColor border-opacity-[80%] border-b-[1px]">
        <div className="flex">
          <div className="mt-[10px] ml-[10px]">
            <a href="https://github.com/aryan6582896578/ChatAppMERN" target="_blank">
              <img src="/github-mark-white.svg" className="h-[50%] "/>
            </a>
          </div>
          <div>
            <button className="end-[10px] top-[10px] absolute min-w-[5px] min-h-[45px] bg-red-500 rounded-[10px] hover:bg-text3Color duration-[0.5s]" onClick={() => {
              setserverSettingInviteBoxDisplay(false);
              }}/>
          </div>
        </div>   
      </div>
           <div className="text-[35px] overflow-hidden break-words h-[fit]">
            <div className="text-otherColor font-bold text-center">
              Invite Code
            </div>
           </div>
        <div className="flex justify-evenly ">
            <div className="w-[90%] rounded-[10px] h-[40px] bg-textColor bg-opacity-40 text-otherColor font-semibold text-[20px] text-center mb-[20px] p-[5px]">{inviteCode}</div>
        </div>
      <div className="flex justify-evenly text-[20px]">
        <button
          className={`w-[150px] h-fit p-[10px] mb-[20px] bg-text3Color rounded-[10px] border-solid border-[3px] border-transparent hover:bg-red-500 transition-[1s]`}
          onClick={() => {
            setserverSettingInviteBoxDisplay(false);
          }}
        >
          Cancel
        </button>
        <button
          className={`w-[150px] h-fit p-[10px] mb-[20px] bg-${color} ${opacity} rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-50 hover:border-${border} transition-[1s]`}
          onClick={() => {
            navigator.clipboard.writeText(inviteCode)
            setserverSettingInviteBoxDisplay(true);
            setcolor("otherColor")
            setopacity("bg-opacity-50")
            setborder("transparent")
            setinviteCodeStatus("Copied")
          }}
        >
          {inviteCodeStatus}
        </button>
      </div>
    </div>
  );
}


