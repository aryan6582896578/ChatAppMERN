import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

export function ServerList({serverList,setserverOptionsDisplay}) {
    const navigate = useNavigate();
    return (
      <div className=" h-[100vh] min-w-[60px] max-w-[70px] bg-primaryColor  text-textColor overflow-y-auto overflow-x-hidden relative ">
        <div className="flex">
          <button
            onClick={() => {
              navigate(`/${import.meta.env.VITE_VERSION}/me/chat`);
            }}
            className="min-w-[5px] min-h-[35px] bg-textColor mt-[10px] hover:cursor-pointer hover:bg-text3Color mb-[25px] ml-auto mr-auto"
          ></button>
        </div>
  
        <div className="flex flex-col relative ">
          {serverList.map((channel, index) => (
            <div key={index} className="m-auto">
              <button
                key={index}
                onClick={() => {
                  navigate(
                    `/${import.meta.env.VITE_VERSION}/me/chat/${channel}`
                  );
                }}
                className="bg-textColor bg-opacity-20 text-[20px] border-transparent border-solid border-[2px] text-text1Color w-[50px] h-[50px] m-auto mb-[10px] rounded-[50px] hover:border-textColor hover:bg-transparent hover:text-otherColor"
              >
                {index}
              </button>
            </div>
          ))}
  
          <button
            onClick={() => {
              setserverOptionsDisplay(true);
            }}
            className="bg-secondaryColor text-[25px] p-[0px] border-secondaryColor border-solid border-[2px] text-otherColor w-[50px] h-[50px] m-auto mb-[10px] rounded-[50px] hover:border-otherColor hover:border-opacity-50 hover:bg-transparent hover:text-otherColor"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  export function ServerOptions({setserverOptionsDisplay,setserverCreateBoxDisplay}){
    
    return (<div className="w-max h-max bg-textColor bg-opacity-10 border-solid border-[1px] rounded-[5px] p-[10px] border-textColor right-[40%]  top-1/3  fixed z-[100]"id="createServer"> 
      <div className="text-center text-otherColor text-[30px]">
        Server
      </div>
      <div className="flex mt-[10px] justify-evenly w-[350px]">
      <button onClick={() => {
            setserverOptionsDisplay(false)
            
          }}className="w-[100px] bg-text3Color bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-text3Color hover:bg-opacity-25">
          Cancel
        </button>
        <button onClick={() => {
            setserverOptionsDisplay(false)
            setserverCreateBoxDisplay(true)
          }}className="w-[100px] bg-textColor bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-textColor hover:bg-opacity-25">
          Create Server
        </button>
        <button
          onClick={() => {
            console.log("join Server")
          }}
          className="w-[100px] bg-text1Color bg-opacity-100 Color rounded text-textColor h-[40px] border-solid border-[2px] border-text1Color hover:bg-opacity-25 hover:text-text1Color ">
          Join Server
        </button>
      </div>
    </div>)

  }


export function ServerCreateBox({setcreateServerData,createServerData,setserverCreateBoxDisplay,postCreateServer}) {
    
    return (
      <div className="w-max h-max bg-textColor bg-opacity-10 border-solid border-[1px] rounded-[5px] p-[10px] border-textColor right-[40%]  top-1/3  fixed z-[100]" id="createServer">
        <div className="text-center text-otherColor text-[30px]">
          Create Servers
        </div>
        <input
         
         onChange={(e) => {
          
          setcreateServerData({...createServerData,serverName:e.target.value});
         }}
          type="text"className="bg-textColor w-[300px] bg-opacity-40 rounded-[5px] h-[40px] outline-none mt-[10px] text-otherColor p-[10px]" placeholder="server name"
        />
        <div className="flex mt-[10px] justify-evenly">
          <button
            onClick={() => {
              setserverCreateBoxDisplay(false);
            }}
            className="w-[100px] bg-text3Color bg-opacity-100 Color rounded text-otherColor h-[40px] border-solid border-[2px] border-text3Color hover:bg-opacity-25 "
          >
            Cancel
          </button>
          <button
            onClick={() => {
              postCreateServer();
            }}
            className="w-[100px] bg-text1Color bg-opacity-100 Color rounded text-textColor h-[40px] border-solid border-[2px] border-text1Color hover:bg-opacity-25 hover:text-text1Color "
          >
            Create
          </button>
        </div>
      </div>
    );
  }