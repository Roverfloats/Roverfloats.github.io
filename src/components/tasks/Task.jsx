import Cross from "../../media/icons/Cross.png"
import Check from "../../media/icons/Check.png"
import CompleteTaskPopup from "../popups/CompleteTaskPopup"
import RemoveTaskFromList from "../popups/RemoveTaskFromList"

function Task({taskData, setReload, setPopupContent, setPopup}) {
    return (
        <div
            className={`items-end justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] 
            ${taskData.completed ? "border-[#008800] dark:border-[#004700] bg-[#00BC00] dark:bg-[#008800]" : "border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717]"}`}
        >
            <div className={`h-full w-[60%] ${taskData.completed ? "text-white dark:text-black" : "text-black dark:text-white"}`}>
                <div className="text-[25px]">{taskData.title}</div>
                <div className="text-wrap">{taskData.description}</div>
                <div className="text-wrap">{taskData.time}</div>
            </div>
            <div className="flex justify-end h-full w-[40%] ">
                {
                    !taskData.completed ?
                    <button 
                        onClick={() => {setPopupContent(<CompleteTaskPopup
                            setReload={setReload}
                            setPopup={setPopup}
                            taskData={taskData}
                        />), setPopup(true)}}
                        className="w-[40px] h-[40px] mr-[20px]"
                    >
                        <img src={Check} alt="" />
                    </button>
                    : <></>
                }

                <button
                    onClick={() => {setPopupContent(<RemoveTaskFromList
                        setReload={setReload}
                        setPopup={setPopup}
                        taskData={taskData}
                    />), setPopup(true)}}
                    className="w-[40px] h-[40px]"
                >
                    <img src={Cross} alt="" />
                </button>
            </div>
        </div>
    )
}

export default Task
