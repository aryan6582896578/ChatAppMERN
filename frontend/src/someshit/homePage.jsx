import { Outlet,Navigate,useNavigate } from 'react-router';
export default function  HomePage(){
    const navigate = useNavigate();
     const [authStatus,setAuthStatus]=useState(false)
    useEffect(() => {
      
        if(!authStatus){
            return navigate("/")
        }
    
      
    }, [])
    
 
    return (

<>

<Outlet />
</>

    )

}