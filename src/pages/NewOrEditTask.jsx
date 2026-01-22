import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from "react-router";
import { AddDailyTaskPreset, GetDailyTaskPresetById, UpdateDailyTaskPreset } from '../endpoints/DailyTaskPreset';

function NewOrEditTask({isDailyTaskPreset, editing}) {
    const navigate = useNavigate({});
    const {id: taskId} = useParams();
    var colors = JSON.parse(localStorage.getItem("colors"))

    const [isDailyTask, setIsDailyTask] = useState(isDailyTaskPreset);
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [errText, setErrText] = useState("");

    useEffect(() => {
      const Fetch = async () => {
        if(taskId){
          var preexistingData = await GetDailyTaskPresetById(taskId);
          setTitle(preexistingData.title)
          setdescription(preexistingData.description)
        }
      }
      
      Fetch();
    }, []);

    useEffect(() => {
        const ResetErrText = async () => {
          setErrText("")
        }
        ResetErrText();
    }, [title, description]);

    async function HandleSubmit() {
      if(title == ""){
        setErrText("Title cannot be empty.");
        return
      }
      if(description == ""){
        setErrText("description cannot be empty.");
        return
      }

      if(isDailyTask){
        if(editing){
          if(!taskId){
            console.error("")
            return
          }

          UpdateDailyTaskPreset(taskId, title, description);
          navigate("/tasks");
          return
        }
        if(!editing){
          var time = "14:00"
          await AddDailyTaskPreset(title, description, time);
          navigate("/tasks");
          return;
        }

      }
    }

  return (
    <>
        <Header/>
        <div className='w-full h-auto px-[50px]'>
          <p className='text-black dark:text-white'>Daily Task</p>
          <label className={`relative inline-block w-11 h-6 ${editing ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
              disabled={editing}
              type="checkbox"
              className="peer sr-only"
              onChange={(e) => setIsDailyTask(e.target.checked)}
              checked={isDailyTask}
            />
            <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out dark:bg-[#D0D0D0] peer-checked:bg-[#0096FF] dark:peer-checked:bg-[#0065AD] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
          </label>

          <div className='mt-[20px]'>
            <p className='text-black dark:text-white'>Title</p>
            <input
              placeholder='Title...'
              value={title}
              className='w-auto min-w-[100px] h-[30px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
              type="text" 
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='my-[20px]'>
            <p className='text-black dark:text-white'>description</p>
            <textarea
              placeholder='description...'
              value={description}
              className='w-auto min-w-[100px] h-[100px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>

          <p className='text-[#DF121B]'>{errText}</p>
          <div className="flex flex-col md:flex-row md:w-[400px] justify-between">
            <button
              className="w-[150px] h-[40px] border-2 rounded-[15px] border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717] text-black dark:text-white"
              onClick={() => navigate("/tasks")}
            >Cancel</button>
            <button
              className="w-[150px] h-[40px] rounded-[15px] mt-[20px] md:mt-[0] text-white bg-[#0096FF] dark:bg-[#0065AD]"
              onClick={() => HandleSubmit()}
            >Submit</button>
          </div>
        </div>
    </>

  )
}
export default NewOrEditTask
