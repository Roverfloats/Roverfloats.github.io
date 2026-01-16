import { useNavigate } from "react-router";
import DeleteDailyTaskPopup from "../popups/DeleteDailyTaskPopup";

function DailyTaskPreset({taskPresetData, setReload, setPopup, setPopupContent}) {
    let navigate = useNavigate();

    return (
        <div className="md:items-end flex-col md:flex-row justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] border-[#D0D0D0] bg-white">
            <div className="">
                <div className="text-[25px]">{taskPresetData.title}</div>
                <div className="text-wrap">{taskPresetData.discription}</div>
            </div>
            <div className="flex flex-col md:flex-row">
                <button onClick={() => navigate(`/edit-daily-preset/${taskPresetData.id}`)} className="px-[20px] w-auto h-[40px] bg-[#0096FF] text-white rounded-[15px] my-[10px] md:my-[0] md:mr-[10px] ">Edit Preset</button>
                <button onClick={() => {setPopupContent(<DeleteDailyTaskPopup setReload={setReload} setPopup={setPopup} taskPresetData={taskPresetData}/>), setPopup(true)}} className="px-[20px] w-auto h-[40px] border-2 border-[#D0D0D0] bg-white rounded-[15px]">Remove Preset</button>
            </div>

        </div>
    )
}

export default DailyTaskPreset
