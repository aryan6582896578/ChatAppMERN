import {useNavigate} from "react-router";

export default function LoadingPage({someError,redirect = `/`,}) {
  const navigate = useNavigate();
  return (
    <div className="bg-primaryColor min-h-screen w-full overflow-hidden text-textColor text-center text-[100px] pt-[100px] ">   
        <button onClick={() => {
            navigate(redirect);
          }}className="min-w-[5px] min-h-[35px] bg-textColor mt-[10px] hover:cursor-pointer hover:bg-otherColor mb-[25px] ml-auto mr-auto sm:min-h-[50px] ">
        </button>

        <span className="text-[45px] ml-[20px] mr-[15px] text-text3Color hover:cursor-pointer font-semibold sm:text-[70px] animate-pulse ">
            {someError}
        </span>

        <button onClick={() => {location.reload()}} className="text-[25px] font-semibold underline sm:text-[35px] hover:text-otherColor">
            reload?
        </button>
    </div>
  );
}
