import Check from '../media/icons/Check.png'
import Cross from '../media/icons/Cross.png'
import { RemoveDailyTask, SetDailyTaskToDone } from "../endpoints/DailyTasks"

function DailyTask({taskData, ActivatePopup, DeactivatePopup, setReload}) {
    async function HandleRemoveDailyTask(){
        await RemoveDailyTask(taskData.id)
        DeactivatePopup()
        setReload(prev => !prev)
    }

    async function HandleSetDailyTaskToDone(){
        await SetDailyTaskToDone(taskData.id)
        DeactivatePopup()
        setReload(prev => !prev)
    }

    return (
        <div className={`flex justify-between items-center h-[50px] w-full border-2 rounded-[15px] mb-[20px] ${taskData.completed ? "border-[#008800] bg-[#00BC00]" : "border-[#D0D0D0] bg-white" }`}>
            <p className={`ml-[20px] ${taskData.completed ? "text-white" : "text-black"}`}>{taskData.title}</p>
            {
                taskData.completed ?
                <p className="mr-[20px] text-white">Completed</p>
                :
                <div>
                    <button className="h-[30px] w-[30px] m-[10px]" onClick={() => ActivatePopup(
                        <div className='flex flex-col justify-center w-full h-auto'>
                            <p className='text-center text-[20px]'>Is this task done?</p>
                            <div className='flex w-full h-auto justify-between mt-[20px]'>
                                <button className='w-[150px] h-[40px] bg-white border-[#D0D0D0] border-2 rounded-[15px] text-black' onClick={() => DeactivatePopup()}>No</button>
                                <button className='w-[150px] h-[40px] bg-[#0096FF] text-white  rounded-[15px] ' onClick={() => HandleSetDailyTaskToDone()}>Yes</button>
                            </div>
                        </div>                        
                    )}>
                        <img src={Check} alt="" />
                    </button>
                    <button className="h-[30px] w-[30px] m-[10px] mr-[20px]" onClick={() => ActivatePopup(
                        <div className='flex flex-col justify-center w-full h-auto'>
                            <p className='text-center text-[20px]'>Are you sure you wanna remove this task?</p>
                            <div className='flex w-full h-auto justify-between mt-[20px]'>
                                <button className='w-[150px] h-[40px] bg-[#0096FF] rounded-[15px] text-white' onClick={() => DeactivatePopup()}>No</button>
                                <button className='w-[150px] h-[40px] bg-white text-black rounded-[15px] border-[#D0D0D0] border-2' onClick={() => HandleRemoveDailyTask()}>Yes</button>
                            </div>
                        </div>
                    )}>
                        <img src={Cross} alt="" />
                    </button>
                </div>
            }
        </div>
    )
}

export default DailyTask
