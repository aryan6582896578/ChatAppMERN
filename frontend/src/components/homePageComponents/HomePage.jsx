import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function HomePage(){
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
document.title =`Home | ${import.meta.env.VITE_NAME}`

function HomePageNavbar({buttonStatus}){
    const navigate = useNavigate();

    return(
        <div className="bg-secondaryColor min-h-[70px] flex border-b-otherColor/80 border-b-[1px] relative">
            <div className="mt-[15px] ml-[5px] text-[25px] font-medium rounded-[15px] text-otherColor hover:text-otherColor/80 duration-[0.5s] flex hover:cursor-pointer select-none ">
                <div className={`max-h-[100%] mb-[10px] min-w-[5px]  mr-[8px] duration-[0.5s] rounded-[10%] bg-textColor`}></div>
                <div>{`${import.meta.env.VITE_NAME}`}</div>  
            </div>
            <button className="absolute right-0 bg-primaryColor text-otherColor/80 mr-[40px] text-[30px] mt-[10px] pl-[20px] pr-[20px] rounded-[10px] font-semibold hover:cursor-pointer hover:text-otherColor duration-[0.5]" onClick={()=>{
                {buttonStatus?navigate(`${import.meta.env.VITE_VERSION_LIVE}/@me/chat`):navigate(`${import.meta.env.VITE_VERSION_LIVE}/login`)}
            }}>{buttonStatus?"Open Chat":"Login"}</button>
        </div>
    )
}
