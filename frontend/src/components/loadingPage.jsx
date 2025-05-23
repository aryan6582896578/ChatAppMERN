import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function LoadingPage({someError,redirect = `/${import.meta.env.VITE_VERSION}/`,}) {
  let navigate = useNavigate();
  return (
    <div className="bg-primaryColor min-h-screen w-full overflow-hidden text-textColor text-center text-[100px] pt-[100px] ">
      
        <button onClick={() => {
            navigate(redirect);
          }}className="min-w-[5px] min-h-[100px] bg-textColor mt-[10px] hover:cursor-pointer hover:bg-text3Color mb-[25px] ml-auto mr-auto">

        </button>

        <span className="text-[25px] ml-[20px] mr-[15px] text-text3Color font-semibold">
            {someError}
        </span>

        <button onClick={() => {
              location.reload();
            }}className="text-[25px] font-semibold underline ">
            reload?
        </button>
  
    </div>
  );
}
