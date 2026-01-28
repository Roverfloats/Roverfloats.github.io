import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate, useParams } from "react-router";
import { AddRecurringTaskPreset, GetRecurringTaskPresetById, UpdateRecurringTaskPreset } from '../../endpoints/RecurringTaskPresets';
import { AddTask, GetTaskById, UpdateTask } from '../../endpoints/Tasks';

function NewOrEditTask({isRecurringTaskPreset, editing}) {
  const navigate = useNavigate({});
  const {id: taskId} = useParams();

  const [isRecurringTask, setIsRecurringTask] = useState(isRecurringTaskPreset);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [time, setTime] = useState("12:00");
  const [timeSelected, setTimeSelected] = useState(false);
  const [errText, setErrText] = useState("");

  useEffect(() => {
    if (!taskId) return;

    const fetchData = async () => {
      const preexistingData = isRecurringTaskPreset
        ? await GetRecurringTaskPresetById(taskId)
        : await GetTaskById(taskId);

      setTitle(preexistingData.title);
      setdescription(preexistingData.description);
      setTime(preexistingData.time || "12:00");
      setTimeSelected(!!preexistingData.time);
    };

    fetchData();
  }, [taskId, isRecurringTaskPreset]);

  useEffect(() => {
    const UpdateText = async () => {
      setErrText("")
    }
    UpdateText()
  }, [title, description]);

  async function HandleSubmit() {
    if (title === "") {
      setErrText("Title cannot be empty.");
      return;
    }
    if (description === "") {
      setErrText("description cannot be empty.");
      return;
    }

    const tempTime = timeSelected ? time : "";

    if (editing && !taskId) {
      console.error("Missing taskId");
      return;
    }

    if (isRecurringTask) {
      if (editing) {
        UpdateRecurringTaskPreset(taskId, title, description, tempTime);
      } else {
        await AddRecurringTaskPreset(title, description, tempTime);
      }
    } else {
      if (editing) {
        UpdateTask("", taskId, title, description, tempTime);
      } else {
        await AddTask("", title, description, tempTime);
      }
    }

    navigate("/tasks");
  }

  return (
    <>
        <Header/>
        <div className='w-full h-auto px-[50px]'>
          <p className='text-black dark:text-white'>Recurring Task</p>
          <label className={`relative inline-block w-11 h-6 ${editing ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
              disabled={editing}
              type="checkbox"
              className="peer sr-only"
              onChange={(e) => setIsRecurringTask(e.target.checked)}
              checked={isRecurringTask}
            />
            <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out dark:bg-[#D0D0D0] peer-checked:bg-[#0096FF] dark:peer-checked:bg-[#0065AD] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
          </label>

          <div className='mb-[20px]'>
            <p className='text-black dark:text-white'>Title</p>
            <input
              placeholder='Title...'
              value={title}
              className='w-auto min-w-[100px] h-[30px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
              type="text" 
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-[20px]'>
            <p className='text-black dark:text-white'>Description</p>
            <textarea
              placeholder='description...'
              value={description}
              className='w-auto min-w-[100px] h-[100px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className='mb-[20px]'>
            <p className='text-black dark:text-white'>Time</p>
            <div className='flex items-center'>
              <label className={`mr-[20px] relative inline-block w-11 h-6 cursor-pointer`}>
              <input
                className="peer sr-only"
                type='checkbox'
                checked={timeSelected}
                onChange={(e) => setTimeSelected(e.target.checked)}
              />
              <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out dark:bg-[#D0D0D0] peer-checked:bg-[#0096FF] dark:peer-checked:bg-[#0065AD] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
              <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
            </label>
            <input
              disabled={!timeSelected}
              type='time'
              value={time}
              className='disabled:text-[#D0D0D0] w-auto min-w-[100px] h-[30px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
              onChange={(e) => setTime(e.target.value)}
            />
            </div>
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
