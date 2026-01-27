import { collection, query, where } from 'firebase/firestore';
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

function Login() {  
  const [password, setPassword] = useState("");
  const [passwordAttempt, setPasswordAttempt] = useState("");
  const [background, setBackground] = useState(NightPc);
  const [wrongPassword, setWrongPassword] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    //fetch password
    const Fetch = async () => {
    var q = query(
      collection(db, "Settings"),
      where("type", "==", "Password")
    );
      q = query(q);
      var password = await FetchData(q);
      setPassword(password[0].value)
    }
    Fetch();
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("allowSensitive", false);

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
        className="flex items-center flex-col p-[50px] w-auto h-auto rounded-[15px] bg-white dark:bg-[#171717]"
      >
        <p
          className='text-[25px] mb-[40px] text-black dark:text-white'
        >Enter Password</p>
        {wrongPassword ? <p className='text-[#DF121B]'>Password is wrong</p> : <></> }
        <input
          type="password"
          onChange={(e) => {setPasswordAttempt(e.target.value), setWrongPassword(false)}}
          className='w-[200px] h-[40px] border-2 rounded-[15px] mb-[20px] p-[10px] text-black dark:text-white border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929]'
        />
        <button
          onClick={() => SignIn()}
          className="w-[200px] h-[40px] rounded-[15px] text-white bg-[#0096FF] dark:bg-[#0065AD]"
        >Enter</button>
      </div>
    </div>
  )
}

export default Login
