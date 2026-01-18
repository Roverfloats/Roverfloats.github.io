import { collection, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { db } from '../firebase';
import { FetchData } from '../endpoints/General';
import bcrypt from 'bcryptjs';

import DayPc from "../media/images/pc-backgrounds/DayPc.png"
import NightPc from "../media/images/pc-backgrounds/NightPc.png"
import DayPhone from "../media/images/phone-backgrounds/DayPhone.png"
import NightPhone from "../media/images/phone-backgrounds/NightPhone.png"
import moment from 'moment';

function Login({SetTheme}) {
  localStorage.clear()
    var colors = JSON.parse(localStorage.getItem("colors"))

    if(!colors){
      SetTheme();
      colors = JSON.parse(localStorage.getItem("colors"))
    }
    
    const [password, setPassword] = useState("");
    const [passwordAttempt, setPasswordAttempt] = useState("");
    const [background, setBackground] = useState(NightPc);
    const [wrongPassword, setWrongPassword] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
      //fetch password
      const Fetch = async () => {
        let q = collection(db, "Password");
        q = query(q);
        var password = await FetchData(q);
        setPassword(password[0].entry)
      }
      Fetch();
      localStorage.setItem("loggedIn", false);

      //set background image
      const startDay = moment('10:00', 'HH:mm');
      const startNight = moment('20:00', 'HH:mm');

      if (moment().isBetween(startDay, startNight, 'minute', '[]')) {
        if(window.innerWidth < 500)
          setBackground(DayPhone)
        else{
          setBackground(DayPc)
        }
      } else {
        if(window.innerWidth < 500)
          setBackground(NightPhone)
        else{
          setBackground(NightPc)
        }
      }
    }, []);

    useEffect(() => {
      setWrongPassword(false)
    }, [passwordAttempt]);

    function SignIn() {
      if(bcrypt.compareSync(passwordAttempt, password)){
        localStorage.setItem("loggedIn", true);
        navigate("/frontpage");
        return;
      }
      setWrongPassword(true);
    }

    ////code to generate new password
    // function hashtest(){
    //   const salt = bcrypt.genSaltSync();
    //   const hashed = bcrypt.hashSync("password", salt);
    //   cons ole.log(hashed); //broken to remove from searches, i hate leaving console logs
    // }

  return (
    <div
      className="flex justify-center items-center w-full h-full bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className="flex items-center flex-col p-[50px] w-auto h-auto rounded-[15px]"
        style={{backgroundColor: colors.background,}}
      >
        <p
          className='text-[25px] mb-[40px]'
          style={{
            color: colors.text,
          }}
        >Enter Password</p>
        {wrongPassword ? <p style={{color: colors.red}}>Password is wrong</p> : <></> }
        <input
          type="password"
          onChange={(e) => {setPasswordAttempt(e.target.value), setWrongPassword(false)}}
          className='w-[200px] h-[40px] border-2 rounded-[15px] mb-[20px] p-[10px]'
          style={{
            color: colors.text,
            borderColor: colors.border,
            backgroundColor: colors.inputBackground,
          }}
        />
        <button
          onClick={() => SignIn()}
          className="w-[200px] h-[40px] rounded-[15px]"
          style={{
            color: colors.textOnBlue,
            backgroundColor: colors.blue,
          }}
        >Enter</button>
      </div>
    </div>
  )
}

export default Login
