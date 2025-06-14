import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function HomePage(){
    const navigate = useNavigate();
    const [buttonStatus ,setButtonStatus] = useState(false)

    useEffect(() => {
        document.title =`Home | ${import.meta.env.VITE_NAME}`
        if(document.cookie){ 
            setButtonStatus(true)
        }
    },[])

    return(
        <div className="bg-primaryColor min-h-screen w-full  text-textColor overflow-hidden">
         <HomePageNavbar buttonStatus={buttonStatus} />
        
            </div>
    )
}

function HomePageNavbar({buttonStatus}){
    const navigate = useNavigate();
    const [bgLogo,setbgLogo]=useState("textColor");
    const tailwindfix = {textColor: " bg-textColor",otherColor: "bg-otherColor",}

    return(
        <div className="bg-secondaryColor min-h-[70px] flex border-b-otherColor border-opacity-[80%] border-b-[1px] relative">
            <div className="mt-[15px] ml-[5px] text-[25px] font-medium rounded-[15px] text-otherColor hover:text-textColor duration-[0.5s] flex hover:cursor-pointer select-none"
            onMouseEnter={()=>{ setbgLogo("otherColor")}} onMouseLeave={()=>{setbgLogo("textColor")}}>
                <div className={`max-h-[100%] mb-[10px] min-w-[5px] bg-${bgLogo} mr-[8px] duration-[0.5s] rounded-[10%]`}></div>
                <div>{`${import.meta.env.VITE_NAME}`}</div>  
            </div>
            <div className="hidden sm:block duration-[0.5s]">
                
                <a href="https://github.com/aryan6582896578/ChatAppMERN" target="_blank">
                    <img src="/github-mark-white.svg" className="h-[70%] end-[180px] top-[10px] absolute"/>
                </a>
            </div>
            {buttonStatus? <button onClick={()=>{
                navigate(`${import.meta.env.VITE_VERSION}/@me/chat`)
            }} className="absolute end-0 bg-primaryColor w-[120px] h-[50px] mt-[10px] mr-[10px] text-[20px] font-medium rounded-[15px] text-otherColor hover:text-textColor duration-[0.5s]  sm:w-[150px]" >Open Chat</button> 
            : <button onClick={()=>{
                navigate(`${import.meta.env.VITE_VERSION}/login`)
          
          }} className="absolute end-0 bg-primaryColor w-[100px] h-[50px] mt-[10px] mr-[10px] text-[20px] font-medium rounded-[15px] text-otherColor hover:text-textColor duration-[0.5s] sm:w-[150px]">Login</button>}
       
       
        </div>
    )
}
