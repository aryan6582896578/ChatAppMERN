import {useNavigate } from "react-router";
export default function ServerError(){
    const navigate = useNavigate()
    document.title =`Error | ${import.meta.env.VITE_NAME}`
    return(
        <div className="bg-primaryColor w-screen min-h-screen flex flex-col text-otherColor overflow-hidden">
            <div className="bg-secondaryColor h-[70px] w-[100%] relative flex border-b-otherColor border-opacity-[80%] border-b-[1px]">
                <div className="flex"onClick={()=>{navigate("/")}}>
                    <div className={`min-h-[70%] mb-auto mt-auto min-w-[5px] bg-textColor ml-[5px] rounded-[10%]`}></div>
                    <div className="text-[25px] font-medium mt-auto mb-auto ml-[10px] hover:text-textColor">{`${import.meta.env.VITE_NAME}`}</div>
                </div>
            </div>
            <div className="mt-[180px] sm:mt-[150px]">
                <div className="text-center text-[20px] font-medium opacity-[90%] sm:text-[30px] select-none">We Are Checking</div>
                <div className="font-bold text-[40px] text-center text-text3Color align-middle sm:text-[50px]"> <span className="animate-pulse">Error 500 </span><div className="text-[20px] sm:text-[30px] ">Internal Server Error <span className="text-otherColor font-medium underline opacity-[90%] hover:cursor-pointer hover:text-textColor sm:text-[25px]" onClick={()=>{
                    location.reload()
                }}>Reload?</span></div></div>

            </div>
        </div>
    )
}