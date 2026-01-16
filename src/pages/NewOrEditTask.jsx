import { useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from "react-router";

function NewOrEditTask() {
    let navigate = useNavigate({});

    const [isDailyTask, setIsDailyTask] = useState(false);
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");

    function HandleSubmit() {

    }


  return (
    <>
        <Header/>
        <div className='w-full h-auto px-[50px]'>
          <p>Daily Task</p>
          <label className="relative inline-block w-11 h-6 cursor-pointer">
            <input type="checkbox" className="peer sr-only" onChange={(e) => setIsDailyTask(e.target.checked)} checked={isDailyTask}/>
            <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 dark:bg-[#D0D0D0] dark:peer-checked:bg-[#0096FF] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
          </label>

          <div>
            <p></p>
            <input className='w-auto min-w-[100px] h-[30px] border-2 border-[#D0D0D0] bg-white rounded-[15px] p-[10px]' type="text" onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div>
            <p></p>
            <input type="text" />
          </div>

          <div className="flex justify-between">
            <button className="w-[150px] h-[40px] border-2 border-[#D0D0D0] bg-white rounded-[15px]" onClick={() => navigate("/tasks")}>Cancel</button>
            <button className="w-[150px] h-[40px] bg-[#0096FF] text-white rounded-[15px]" onClick={() => HandleSubmit()}>Submit</button>
          </div>
        </div>
    </>

  )
}

export default NewOrEditTask
