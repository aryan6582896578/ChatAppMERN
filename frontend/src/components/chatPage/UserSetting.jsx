export function UserSetting({username}) {
    return (
      <div className="w-[100%] h-[5%] bg-primaryColor absolute bottom-[0px] rounded-[5px] text-[25px]  pl-[10px] hover:rounded-none hover:cursor-pointer">
        <div className="flex relative w-full h-full">
          <span className="hover:text-text3Color">{username}</span>
          <div className="min-w-[5px] min-h-[100%] bg-textColor hover:bg-text3Color absolute right-[0px] bottom-[0px] hover:cursor-not-allowed "></div>
        </div>
      </div>
    );
  }