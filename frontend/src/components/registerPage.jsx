import { useState, useRef, useEffect } from "react";
import { Link ,useNavigate } from "react-router";
import LoadingPage from "./loadingPage";

export default function RegisterPage() {
  const [userData, setuserData] = useState({ username: "", password: "" });
  const [loadingPage, setloadingPage] = useState(false);
  const [displayPassword, setdisplayPassword] = useState(false);
  const [displayError, setdisplayError] = useState("");
  let navigate = useNavigate();
  async function registerUser() {
    setuserData({ username: "", password: "" });
    console.log("yes dataset", userData.username);
    if (userData.username && userData.password) {
      setloadingPage(true)
      await sendData();
    } else {
      console.log("no data");
    }
  }

  const sendData = async () => {
    const url = `http://localhost:4500/${import.meta.env.VITE_VERSION}/registerUser`
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json  = await response.json();
      if(json.status === "userCreated"){
        navigate(`/${import.meta.env.VITE_VERSION}/login`)
      }else{
        setloadingPage(false)
        setdisplayError("Username already exists")
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };
  function changedisplayPassword() {
    if (displayPassword) {
      setdisplayPassword(false);
    } else {
      setdisplayPassword(true);
    }
  }

  return (
    <>
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <div className="bg-primaryColor min-h-screen w-full overflow-hidden text-textColor   ">
          <div className="flex flex-col bg-secondaryColor mt-[50px] ml-auto mr-auto min-w-fit w-[500px] h-fit rounded-[10px] p-[20px]">
            <div className="text-[50px] text-center font-semibold ">Register</div>

            <div className="flex flex-col mb-[5px]">
              <div className="text-[15px] mb-[5px] font-bold">USERNAME <span className="text-text3Color font-semibold">*</span> &nbsp; <span className="text-red-500 font-semibold text-[13px]">{displayError?displayError:""}</span></div>
              <input
                type="text"
                onChange={(e) =>
                  setuserData({ ...userData, username: e.target.value })
                }
                value={userData.username}
                id="usernameRegister"
                placeholder="Username"
                className="p-[5px] outline-none bg-primaryColor text-otherColor rounded-[5px] mb-[5px]"
              />
              <div className="text-[15px] mb-[5px] font-bold">PASSWORD <span className="text-text3Color font-semibold">*</span></div>
              <div className="relative">
                <input
                  type={displayPassword ? "text" : "password"}
                  onChange={(e) =>
                    setuserData({ ...userData, password: e.target.value })
                  }
                  value={userData.password}
                  id="passwordRegister"
                  placeholder="Password"
                  className="p-[5px] outline-none bg-primaryColor text-otherColor w-full rounded-[5px]"
                />
                <button
                  onMouseEnter={changedisplayPassword}
                  onMouseLeave={changedisplayPassword}
                  className="absolute right-[5px] top-[5px] p-0"
                >
                  <div className="bg-text3Color hover:bg-text1Color min-w-[5px] min-h-[25px] "></div>
                </button>
              </div>{" "}
              {/*  add password regex */}
            </div>
            <div className="flex ">
              <div>
                <span className=" text-text2Color hover:underline hover:text-text1Color ">
                  <Link to={{ pathname: `/${import.meta.env.VITE_VERSION}/login` }}> Login? </Link>
                </span>
              </div>
              <div className="mr-auto ml-auto">
                <button
                  onClick={() => {
                    registerUser();
                  }}
                  className="bg-textColor text-otherColor text-[25px] ml-auto mr-auto mt-[10px] p-[10px] rounded-[10px] w-[200px] border-solid border-[3px] border-transparent hover:bg-transparent hover:border-solid hover:border-textColor hover:border-[3px] hover:text-otherColor"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
