import { useNavigate } from "react-router";
import DeleteRecurringTaskPresetPopup from "../popups/DeleteRecurringTaskPresetPopup";

function RecurringTaskPreset({taskPresetData, setReload, setPopup, setPopupContent}) {
    const navigate = useNavigate();

    return (
        <div className="md:items-end flex-col md:flex-row justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] bg-[white] dark:bg-[#171717] border-[#D0D0D0] dark:border-black">
            <div>
                <div className="text-[25px] text-black dark:text-white">{taskPresetData.title}</div>
                <div className="text-wrap text-black dark:text-white">{taskPresetData.description}</div>
                <div className="text-wrap text-black dark:text-white">{taskPresetData.time}</div>
            </div>
            <div className="flex flex-col md:flex-row md:w-[400px] md:justify-end">
                <button
                    onClick={() => navigate(`/edit-recurring-task-preset/${taskPresetData.id}`)}
                    className="px-[20px] w-auto min-h-[40px] rounded-[15px] my-[10px] md:my-[0] md:mr-[10px] bg-[#0096FF] dark:bg-[#0065AD] text-white"
                >Edit Preset</button>
                <button
                    onClick={() => {setPopupContent(<DeleteRecurringTaskPresetPopup
                        setReload={setReload}
                        setPopup={setPopup}
                        taskPresetData={taskPresetData}/>), setPopup(true)}
                    }
                    className="px-[20px] w-auto min-h-[40px] border-2 rounded-[15px] text-black dark:text-white border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717]">Remove Preset</button>
            </div>
        </div>
    )
}

export default RecurringTaskPreset
