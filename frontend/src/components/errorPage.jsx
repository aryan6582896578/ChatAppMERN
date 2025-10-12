import { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router";

export default function ErrorPage(){

    return(
<div className="bg-primaryColor min-h-screen w-full overflow-hidden text-textColor text-center text-[100px] pt-[100px] ">
  <span className="text-text3Color"> Error </span>
  <Link to={{ pathname: `/${import.meta.env.VITE_VERSION_LIVE}/@me/chat`}}>     <button className="text-[25px] text-textColor hover:underline"> go back?</button> </Link>

</div>
     )
}