import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";

export function SettingComponent({setsettingDisplay}){
  const navigate = useNavigate();
  const [userData, setuserData] = useState({username: "",userprofileurl: null,});
  const [uploadedImage, setuploadedImage] = useState(null);
  const [uploadProfileComponentDisplay ,setuploadProfileComponentDisplay]=useState(false)


  async function getUserData() {
    try {
      const getUserData = await axios.get(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/verify`,{
          withCredentials: true,});
      if (getUserData) {
        setuserData({...userData,username: getUserData.data.username,userprofileurl: getUserData.data.userprofileurl}); //userprofileurl:getUserData.data.userprofileurl
      }
    } catch (error) {
      console.log(error, "error get server list");
    }
  }
  function logoutUser() {
    document.cookie = "tokenJwt=;max-age=0; path=/;";
    navigate("/");
  }
  async function saveProfile(){
    try {
      const formData = new FormData();
      formData.append('img', uploadedImage);
      const updateProfile = await axios.post(`${import.meta.env.VITE_SERVERURL}${import.meta.env.VITE_VERSION}/me/updateProfilePicture`,formData,{
        withCredentials: true
      });
      if(updateProfile.data.status==="updated"){
        setuploadProfileComponentDisplay(false);
          getUserData();
      }else{
        setuploadProfileComponentDisplay(false);
        getUserData();
        console.log("error in profile updating")
      }
        
    } catch (error) {
        console.log("error updating user pfp ",error)
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  document.title = `Settings | ${import.meta.env.VITE_NAME}`;
  return (
    <div className="w-[100%] h-[100%] fixed top-[0px] left-0 bg-primaryColor z-[10]">
      <div className="bg-primaryColor h-[70px] w-[100%]  border-b-otherColor border-opacity-[80%] border-b-[1px] relative ">
        <div className="flex">
          <div className="text-[30px] text-otherColor font-semibold ml-[10px] mt-[10px]">
            Setting
          </div>
          <div className="absolute end-[10px] top-[15px] hidden md:flex">
            <button
              className="min-w-[5px] min-h-[40px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]"
              onClick={() => {
                setsettingDisplay(false);
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-[100%] h-[100%] flex text-otherColor relative">
        <div className="min-w-fit p-[20px] text-[20px] bg-primaryColor flex flex-col">
          <button className="bg-secondaryColor min-w-[200px] rounded-[3px] text-left p-[5px] hover:text-white font-semibold duration-100">
            Profile
          </button>
          <button
            className="bg-red-600 mt-[20px] rounded-[3px] font-semibold hover:bg-red-700"onClick={() => {
              logoutUser();
            }}>
            LOGOUT
          </button>
        </div>

        <div className="bg-secondaryColor rounded-[5px] w-[100%] mb-[50px] p-[50px] pt-[0px] flex flex-col">
          <div className="text-[50px] ml-auto mr-auto flex">
            Hi,<span className="text-textColor ml-[10px]">{userData.username}</span>
          </div>
          <div>
            <div className="flex">
              <div className="">
                <div className="relative">
                  <img src={userData.userprofileurl} alt="err" className="w-[80px] h-[80px] rounded-[100%] bg-gray-900"/>
                  <button className=" bg-primaryColor w-[100%] mt-[5px] rounded-[3px] font-semibold hover:bg-opacity-[80%] hover:bg-otherColor hover:text-secondaryColor duration-[0.4s]" onClick={()=>{
                    setuploadProfileComponentDisplay(true)
                  }}>
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        {uploadProfileComponentDisplay?<UploadProfileComponent  uploadProfileComponentDisplay={uploadProfileComponentDisplay} setuploadProfileComponentDisplay={setuploadProfileComponentDisplay} userData={userData} setuserData={setuserData} setuploadedImage={setuploadedImage} saveProfile={saveProfile} uploadedImage={uploadedImage}/>:""}

      </div>
    </div>
  );
}

function UploadProfileComponent({uploadProfileComponentDisplay,setuploadProfileComponentDisplay,userData,setuserData,setuploadedImage,saveProfile,uploadedImage}){
  const [disableButton,setdisableButton]=useState(false)
  const[errorMessage,seterrorMessage]=useState("")
  return(
<div className={` flex-col bg-textColor bg-opacity-20 w-[50%] h-[fit] absolute top-[10%] left-1/3 rounded-[5px]`}>
          <div className="absolute end-[10px] top-[15px] hidden md:flex">
            <button className="min-w-[5px] min-h-[40px] bg-red-500 rounded-[10%] hover:bg-text3Color transition-[1s]" onClick={() => {
                setuploadProfileComponentDisplay(false)
              }}/>
          </div>
          <div className="font-semibold text-center text-[25px] w-[100%]">
            Edit Profile Picture
          </div>
          <div className="w-[100%] h-[100%] mb-[15%] flex flex-col">

            <div className="max-h-[60%] mt-[5%] ml-auto mr-auto max-w-[100%] flex">
              <img src={userData.userprofileurl} className=" max-w-[150px] min-w-[150px] max-h-[150px] min-h-[150px] rounded-[100%] object-cover " />
            </div>

            <div className="flex mr-auto ml-auto w-[100%] text-center">
              <div className="relative w-[100%] mt-[20px]">
                <label htmlFor="filebox" className="bg-textColor mt-[30px] w-[100px] text-center text-[20px] font-semibold rounded-[3px] p-[5px]">Select File </label>
                <input  type="file" id="filebox" className="hidden " accept="image/png, image/jpeg" onChange={(e)=>{
                  setuploadedImage(e.target.files[0])
                  setuserData({...userData,userprofileurl:URL.createObjectURL(e.target.files[0])})
                  seterrorMessage("")
                }}/>
                <span className="text-red-600 font-bold absolute  min-w-fit ml-[5px]">{errorMessage}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[50px]  justify-evenly flex w-[100%]" >
            <button className={`bg-red-600 font-semibold text-[30px] w-[150px] rounded-[5px] hover:bg-red-700 ${disableButton} disabled`}  onClick={()=>{
              setuploadProfileComponentDisplay(false)
            }}>Cancel</button>
            <button className="bg-textColor bg-opacity-100 font-semibold text-[30px] w-[150px] rounded-[5px] hover:bg-opacity-80" onClick={()=>{
              setdisableButton(true)
              if(uploadedImage){
                seterrorMessage("")
                saveProfile()
              }else{
                seterrorMessage("*Select a image")
              } 
            }}>Save</button>
          </div>
        </div>
  )
}