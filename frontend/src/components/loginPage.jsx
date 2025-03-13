import { useEffect, useState } from "react";
import { Link } from "react-router";



export default function LoginPage() {

  return (
<div className="bg-primaryColor min-h-screen w-full overflow-hidden text-textColor  ">
  login
  <div>

  <Link to={{pathname:"/v1/register"}} > 
         <button className="bg-textColor w-[200px] h-[50px] rounded-[10px] text-[20px] text-white hover:bg-textColor hover:text-white hover:bg-opacity-[50%] hover:underline">  Register? </button>
        </Link>
  </div>
  </div>
  );
}
