import Cross from "../../media/icons/Cross.png"
import Check from "../../media/icons/Check.png"
import CompleteDailyTaskPopup from "../popups/CompleteDailyTaskPopup";
import SetDailyTaskInvisiblePopup from "../popups/SetDailyTaskInvisiblePopup";

function DailyTask({taskData, setReload, setPopupContent, setPopup}) {
    var colors = JSON.parse(localStorage.getItem("colors"))

    return (
        <div
            className="items-end justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px]"
            style={taskData.completed ? {borderColor: colors.greenBorder, backgroundColor: colors.green} : {borderColor: colors.border, backgroundColor: colors.background}}
        >
            <div
                className="h-full w-[60%]"
                style={taskData.completed ? {color: colors.textOpposite} : {color: colors.text}}
            >
                <div className="text-[25px]">{taskData.title}</div>
                <div className="text-wrap">{taskData.description}</div>
            </div>
            <div className="flex justify-end h-full w-[40%] ">
                {
                    !taskData.completed ?
                    <button 
                        onClick={() => {setPopupContent(<CompleteDailyTaskPopup
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
                    onClick={() => {setPopupContent(<SetDailyTaskInvisiblePopup
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

export default DailyTask
