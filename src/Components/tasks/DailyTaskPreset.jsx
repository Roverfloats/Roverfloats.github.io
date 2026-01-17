import { useNavigate } from "react-router";
import DeleteDailyTaskPresetPopup from "../popups/DeleteDailyTaskPresetPopup";

function DailyTaskPreset({taskPresetData, setReload, setPopup, setPopupContent}) {
    const navigate = useNavigate();

    return (
        <div className="md:items-end flex-col md:flex-row justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] border-[#D0D0D0] bg-white">
            <div>
                <div className="text-[25px]">{taskPresetData.title}</div>
                <div className="text-wrap">{taskPresetData.description}</div>
            </div>
            <div className="flex flex-col md:flex-row md:w-[400px] md:justify-end">
                <button
                    onClick={() => navigate(`/edit-daily-preset/${taskPresetData.id}`)}
                    className="px-[20px] w-auto min-h-[40px] bg-[#0096FF] text-white rounded-[15px] my-[10px] md:my-[0] md:mr-[10px] "
                >Edit Preset</button>
                <button
                    onClick={() => {setPopupContent(<DeleteDailyTaskPresetPopup
                        setReload={setReload}
                        setPopup={setPopup}
                        taskPresetData={taskPresetData}/>), setPopup(true)}}
                    className="px-[20px] w-auto min-h-[40px] border-2 border-[#D0D0D0] bg-white rounded-[15px]"
                >Remove Preset</button>
            </div>

        </div>
    )
}

export default DailyTaskPreset
