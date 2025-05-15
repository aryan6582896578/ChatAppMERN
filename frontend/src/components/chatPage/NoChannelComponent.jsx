export function NoChannelComponent(){
    return(
        <div className="bg-secondaryColor w-[100%]">
            <div className="text-center w-[100%] text-[100px] mt-[150px]">
                No Text Channel <span><button className="text-[20px] text-text3Color hover:underline " onClick={()=>{
                    location.reload()
                }} >reload?</button></span>
            </div>
        </div>
    )
}