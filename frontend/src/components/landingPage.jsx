import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function LandingPage(){

const [buttonStatus ,setButtonStatus] = useState(false)
useEffect(() => {
  
// setButtonStatus(true)
  
},[] )

    return(


<div className="bg-primaryColor min-h-screen w-full overflow-hidden text-textColor text-center  ">

    <div className="text-[80px] font-bold [text-shadow:2px_1px_2px_var(--tw-shadow-color)] shadow-text1Color mb-[30px] "> 
     ChatApp 
    </div>
    <div>  
        {buttonStatus ?<Link to={{pathname:"/me"}} > 
         <button className="bg-text2Color min-w-[200px] text-otherColor p-[20px] font-semibold rounded-full border-solid border-transparent border-[2px] text-[30px] bg-opacity-50 
             hover:text-text2Color hover:bg-transparent hover:transition hover:delay-100 hover:border-x-text1Color">  Open Chat
         </button>
        </Link>: 
        <Link to={{pathname:"/v1/login"}} > 
         <button className="bg-secondaryColor w-[200px] h-[100px] rounded-[10px] text-[50px] hover:bg-textColor hover:text-white hover:bg-opacity-[50%]">  Login </button>
        </Link>}
    
    </div>
</div>












      
    )
}