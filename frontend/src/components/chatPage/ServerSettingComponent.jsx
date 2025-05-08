import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function ServerSettingComponent() {
  const navigate = useNavigate();
  const parms = useParams();
  const [serverData, setserverData] = useState("");
  const [serverSettingBoxDisplay, setserverSettingBoxDisplay] = useState(false);
  const [serverSettingInviteBoxDisplay, setserverSettingInviteBoxDisplay] =useState(false);

  const [inviteCode, setinviteCode] = useState(false);
   const [inviteCodeStatus,setinviteCodeStatus]= useState("Copy Code");
  async function createServerInvite() {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/inviteCode/${parms.serverId}`,{
          withCredentials: true,
        }).then((data) => {
        setinviteCode(data.data.inviteCode);
      }).catch(function (error) {
        console.log(error);
      });
  }
  function getServerData() {
    axios.get(`http://localhost:4500/${import.meta.env.VITE_VERSION}/getServerData/${parms.serverId}`,{
        withCredentials: true,
    }).then((data) => {
        setserverData(data.data.serverName);
      }).catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getServerData();
    setserverSettingBoxDisplay(false);
    setserverSettingInviteBoxDisplay(false);
  },[parms.channelId]);

  return (
    <div className=" min-w-[250px] max-h-[55px] min-h-[45px] bg-primaryColor z-100 absolute  flex ">
      <div className="text-[20px] p-[5px] font-semibold hover:text-otherColor hover:cursor-cell ">
        {serverData}
      </div>
      <button
        className="min-w-[5px] min-h-[100%] absolute end-0 bg-textColor hover:bg-text3Color rounded-[10%]  hover:cursor-cell "onClick={() => {
          setserverSettingBoxDisplay(true);
        }}
      />
      {serverSettingBoxDisplay ? (<ServerSettingBoxDisplay setserverSettingBoxDisplay={setserverSettingBoxDisplay} setserverSettingInviteBoxDisplay={setserverSettingInviteBoxDisplay} createServerInvite={createServerInvite}/>) : ("")}
      {serverSettingInviteBoxDisplay ? (<ServerSettingInviteBoxDisplay setserverSettingInviteBoxDisplay={setserverSettingInviteBoxDisplay} inviteCode={inviteCode} inviteCodeStatus={inviteCodeStatus} setinviteCodeStatus={setinviteCodeStatus}/>) : ("")}
    </div>
  );
}

function ServerSettingBoxDisplay({setserverSettingBoxDisplay,setserverSettingInviteBoxDisplay,createServerInvite}) {
  return (
    <div className="w-[500px]  bg-textColor bg-opacity-[33%] left-[30%] top-[30%] fixed z-10 text-otherColor rounded-[10px] ">
      <div className="flex align-middle justify-center mb-[10px] pt-[10px]">
        <div className="text-[40px]">Server Setting</div>
        <button
          className="end-2 top-2 absolute min-w-[5px] min-h-[30px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]"
          onClick={() => {
            setserverSettingBoxDisplay(false);
          }}
        />
      </div>
      <div className="flex justify-evenly text-[20px]">
        <button
          className="w-[150px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s]"
          onClick={() => {
            setserverSettingBoxDisplay(false),
              setserverSettingInviteBoxDisplay(true);
              createServerInvite()
          }}
        >
          Invite Code
        </button>
      </div>
    </div>
  );
}

function ServerSettingInviteBoxDisplay({ setserverSettingInviteBoxDisplay ,inviteCode ,inviteCodeStatus,setinviteCodeStatus}) {
  return (
    <div className="w-[500px]  bg-textColor bg-opacity-[33%] left-[30%] top-[30%] fixed z-10 text-otherColor rounded-[10px] ">
      <div className="flex align-middle justify-center mb-[10px] pt-[10px]">
        <div className="text-[40px]">Server Setting</div>
        <button
          className="end-2 top-2 absolute min-w-[5px] min-h-[30px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]"
          onClick={() => {
            setserverSettingInviteBoxDisplay(false);
          }}
        />
      </div>
        <div className="flex justify-evenly">
            <div className="w-[50%] h-[40px] bg-textColor bg-opacity-30 text-otherColor font-semibold text-[20px] text-center mb-[20px] p-[5px]">{inviteCode}</div>
        </div>
      <div className="flex justify-evenly text-[20px]">
        <button
          className="w-[150px] h-fit p-[10px] mb-[20px] bg-textColor rounded-[10px] border-solid border-[3px] border-transparent hover:bg-opacity-20 hover:border-textColor transition-[1s]"
          onClick={() => {
            navigator.clipboard.writeText(inviteCode)
            setserverSettingInviteBoxDisplay(true);
            setinviteCodeStatus("Copied")
          }}
        >
          {inviteCodeStatus}
        </button>
      </div>
    </div>
  );
}


