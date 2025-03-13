import { useState, useRef,useEffect } from "react";
import { Link } from "react-router";
import LoadingPage from "./loadingPage";

export default function RegisterPage() {
  const [userData, setuserData] = useState({username: "",password:""});
  const [loadingPage, setloadingPage] = useState(false);
  const [displayPassword, setdisplayPassword] = useState(false);
  const [valuePassword, setvaluePassword] = useState("");
  const [valueUsername, setvalueUsername] = useState("");
  async function registerUser() {
  
    setvalueUsername("")
    setvaluePassword("")
    console.log("yes dataset",userData.username)
    if(userData.username&&userData.password){
      await sendData();
    }else{
      console.log("no data")
    }
    
  }
  //{username: valueUsername,password:valuePassword}
async function something(){
  // setloadingPage(true)
  registerUser()
}
// console.log(displayPassword,valuePassword,valueUsername)
  const sendData = async () => {
    try {
      const response = await fetch("http://localhost:4500/v1/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  function changedisplayPassword(){
    if(displayPassword){
      setdisplayPassword(false)
    }else{
      setdisplayPassword(true)
    }
  }
  
  return <>{loadingPage ? <LoadingPage /> : 
  
    <div className="bg-primaryColor min-h-screen w-full overflow-hidden text-textColor   ">
    <div className="flex flex-col bg-secondaryColor mt-[50px] ml-auto mr-auto min-w-fit w-[500px] h-fit rounded-[10px] p-[20px]">
      <div className="text-[50px] text-center">Register</div>

      <div className="flex flex-col mb-[5px]">
        <div className="text-[25px] mb-[5px]">Username:</div>
        <input type="text" onChange={e => setuserData({...userData,username:e.target.value})} value={userData.username} id="usernameRegister" placeholder="Username"className="p-[5px] outline-none bg-primaryColor text-otherColor rounded-[5px]"/>

        {/* <input type="text" onChange={e => setvalueUsername(e.target.value)} value={valueUsername} id="usernameRegister" placeholder="Username"className="p-[5px] outline-none bg-primaryColor text-otherColor rounded-[5px]"/> */}
        <div className="text-[25px] mb-[5px]">Password:</div>
        <div className="relative">
        <input type={displayPassword?"text":"password"} onChange={e => setuserData({...userData,password:e.target.value})} value={userData.password} id="passwordRegister" placeholder="Password"className="p-[5px] outline-none bg-primaryColor text-otherColor w-full rounded-[5px]"/>
          {/* <input type={displayPassword?"text":"password"} onChange={e => setvaluePassword(e.target.value)} value={valuePassword} id="passwordRegister" placeholder="Password"className="p-[5px] outline-none bg-primaryColor text-otherColor w-full rounded-[5px]"/> */}
          <button onMouseEnter={changedisplayPassword} onMouseLeave={changedisplayPassword} className="absolute right-[5px] top-[5px] p-0"><div className="bg-[#f0757b] hover:bg-text1Color min-w-[5px] min-h-[25px] "></div></button>
          </div>  {/*  add password regex */}
      </div>
      <div className="flex ">
        <div>
          <span className=" text-text2Color hover:underline hover:text-text1Color "><Link to={{ pathname: "/v1/login" }}> Login? </Link></span>
        </div>
        <div className="mr-auto ml-auto">
          <button  onClick={()=>{
             console.log("button clicked")
             setuserData({username: valueUsername,password:valuePassword})
             something()
          }} className="bg-textColor text-otherColor text-[25px] ml-auto mr-auto mt-[10px] p-[10px] rounded-[10px] w-[200px] border-solid border-[3px] border-transparent hover:bg-transparent hover:border-solid hover:border-textColor hover:border-[3px] hover:text-otherColor">Register</button>
        </div>
      </div>

    </div>
  </div>
  }</>;
}
