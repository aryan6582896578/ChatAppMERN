import { useState } from "react"

export function ServerSettingBox({setserverSettingBoxDisplay,setserverSettingInviteBoxDisplay,createServerInvite}){
    return(
               <div className="w-max h-max bg-textColor bg-opacity-10 border-solid border-[1px] rounded-[5px] p-[10px] border-textColor right-[40%]  top-1/3  fixed z-[100]"id="createServer"> 
      <div className="text-center text-otherColor text-[30px]">
        Server Settings
      </div>
      <div className="flex mt-[10px] justify-evenly w-[350px]">
      <button onClick={() => {
             setserverSettingBoxDisplay(false)
          }}className="w-[120px] bg-text3Color bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-text3Color hover:bg-opacity-25">
          Cancel
        </button>
        <button onClick={() => {
            createServerInvite()
            setserverSettingBoxDisplay(false)
            setserverSettingInviteBoxDisplay(true)
            
            
          }}className="w-[120px] bg-textColor bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-textColor hover:bg-opacity-25">
          Invite Code
        </button>
      </div>
    </div> 
    )
}

export function ServerSettingInviteBox({setserverSettingInviteBoxDisplay,inviteCode}){
  const [inviteCodeStatus,setinviteCodeStatus]=useState("copy code")
    return(
             <div className="w-max h-max bg-textColor bg-opacity-10 border-solid border-[1px] rounded-[5px] p-[10px] border-textColor right-[40%]  top-1/3  fixed z-[100]"id="createServer"> 
      <div className="text-center text-otherColor text-[30px]">
        Server Settings
      </div>
      <div className="bg-textColor bg-opacity-50 w-[100%] h-[40px] rounded-[5px] text-otherColor font-bold p-[10px] text-center">{inviteCode}</div>
      <div className="flex mt-[10px] justify-evenly w-[350px]">
      <button onClick={() => {
             setserverSettingInviteBoxDisplay(false)
          }}className="w-[120px] bg-text3Color bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-text3Color hover:bg-opacity-25">
          Close
        </button>
        <button onClick={() => {
             navigator.clipboard.writeText(inviteCode)
             setinviteCodeStatus("Copied")
          }}   className="w-[120px] bg-textColor bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-textColor hover:bg-opacity-25 ">
          {inviteCodeStatus}
        </button>
      </div>
    </div> 
    )
}