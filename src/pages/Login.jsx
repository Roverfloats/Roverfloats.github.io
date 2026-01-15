import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

function Login() {
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
      localStorage.setItem("loggedIn", false)
    }, []);

    function SignIn() {
      if(password == "test"){
        localStorage.setItem("loggedIn", true)
        navigate("/frontpage")
        return
      }
      setWrongPassword(true)
    }


  return (
    <div className="flex justify-center items-center w-full h-full bg-[#ff0000]" /*background*/>
      <div className="flex items-center flex-col p-[50px] w-auto h-auto bg-[#fff] rounded-[15px]">
        <p className='text-[25px] mb-[40px]'>Enter Password</p>
        {wrongPassword ? <p className='text-[#DF121B]'>Password is wrong</p> : <></> }
        <input type="password" onChange={(e) => setPassword(e.target.value)} className='w-[200px] h-[40px] border-2 border-[#D0D0D0] rounded-[15px] mb-[20px] p-[10px] bg-[#F4F4F4]'/>
        <button onClick={() => SignIn()} className="w-[200px] h-[40px] bg-[#00c3ff] text-white rounded-[15px]">Enter</button>
      </div>
    </div>
  )
}

export default Login
