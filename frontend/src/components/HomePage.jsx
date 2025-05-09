import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function HomePage(){
    const navigate = useNavigate();
    const [buttonStatus ,setButtonStatus] = useState(false)

    useEffect(() => {
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
    // const tailwindfix = {
    //     textColor: " bg-textColor",
    //     otherColor: "bg-otherColor",
    // }
    //tailwind purges bg-${bgLogo} cause it is never written before 
    // somehow now works 
    return(
        <div className="bg-secondaryColor min-h-[70px] flex  ">
            <div className="mt-[15px] ml-[10px] text-[25px] font-medium rounded-[15px] text-otherColor hover:text-textColor duration-[0.5s] flex"
            onMouseEnter={()=>{ setbgLogo("otherColor")}} onMouseLeave={()=>{setbgLogo("textColor")}}>
                <div className={`max-h-[100%] mb-[10px] min-w-[5px] bg-${bgLogo} mr-[8px] duration-[0.5s] rounded-[10%]`}></div>
                <div>ChatAppMern</div>  
            </div>
            {buttonStatus? <button onClick={()=>{
                navigate(`${import.meta.env.VITE_VERSION}/@me/chat`)
            }} className="absolute end-0 bg-primaryColor w-[150px] h-[50px] mt-[10px] mr-[10px] text-[20px] font-medium rounded-[15px] text-otherColor hover:text-textColor duration-[0.5s]" >Open Chat</button> 
            : <button onClick={()=>{
                navigate(`${import.meta.env.VITE_VERSION}/login`)
            }} className="absolute end-0 bg-primaryColor w-[150px] h-[50px] mt-[10px] mr-[10px] text-[20px] font-medium rounded-[15px] text-otherColor hover:text-textColor duration-[0.5s]">Login</button>}
        </div>
    )
}
