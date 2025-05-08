import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
export function ChatBoxComponent() {
    const navigate = useNavigate();
    const path = document.URL.split("chat/")[1];
  let date = new Date();
  const inputRef = useRef(null);
  const [messageData,setmessageData]=useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log("gg",messageData)
    }
  };
  useEffect(() => {
    ax
  
    
  }, [])
  
  return (
    // <>
    // {date.toUTCString()}
    // </>
    <div className="w-[100%] bg-primaryColor flex flex-col relative ">
      <div className="w-[100%] min-h-[45px] border-solid border-b-[1px] border-secondaryColor">channel name</div>
      {messageData}
      <div className="min-h-[55px] flex absolute bottom-0 bg-primaryColor w-[100%] ">
        <div contentEditable
      className="w-[100%] m-[5px] mb-[0xp] outline-none bg-secondaryColor bg-opacity-[30%] text-[20px] pl-[10px] pt-[5px]"
      ref={inputRef}
      onKeyDown={handleKeyDown}
      spellCheck={true}
      onInput={(e)=>{
        setmessageData(e.target.innerText)
    }
    
      }
    />
    

      </div>
    </div>
  );
}
