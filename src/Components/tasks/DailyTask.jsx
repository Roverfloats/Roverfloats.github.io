import Cross from "../../media/icons/Cross.png"
import Check from "../../media/icons/Check.png"
import CompleteDailyTaskPopup from "../popups/CompleteDailyTaskPopup";
import DeleteDailyTaskPopup from "../popups/DeleteDailyTaskPopup";

function DailyTask({taskData, setReload, setPopupContent, setPopup}) {


    return (
        <div className={`items-end justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] ${taskData.completed ? "border-[#008800] bg-[#00BC00]" : "border-[#D0D0D0] bg-white"}`}>
            <div className={`h-full w-[70%] ${taskData.completed ? "text-white" : "text-black"}`}>
                <div className="text-[25px]">{taskData.title}</div>
                <div className="text-wrap">{taskData.description}</div>
            </div>
            <div className="flex justify-end h-full w-[30%] ">
                {
                    !taskData.completed ?
                    <button onClick={() => {setPopupContent(<CompleteDailyTaskPopup setReload={setReload} setPopup={setPopup} taskData={taskData}/>), setPopup(true)}} className="w-[40px] h-[40px] mr-[20px]">
                        <img src={Check} alt="" />
                    </button>
                    : <></>
                }

                <button onClick={() => {setPopupContent(<DeleteDailyTaskPopup setReload={setReload} setPopup={setPopup} taskData={taskData}/>), setPopup(true)}} className="w-[40px] h-[40px]">
                    <img src={Cross} alt="" />
                </button>
            </div>
        </div>
    )
}

export default DailyTask
