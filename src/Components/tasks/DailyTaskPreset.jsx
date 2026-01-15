import { useNavigate } from "react-router";

function DailyTaskPreset({taskPresetData}) {
    let navigate = useNavigate();

    return (
        <div className="items-end justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] border-[#D0D0D0] bg-white">
            <div className="max-w-[400px]">
                <div className="text-[25px]">{taskPresetData.title}</div>
                <div className="text-wrap">{taskPresetData.discription}</div>
            </div>
            <button onClick={() => navigate(`/edit-daily-preset/${taskPresetData.id}`)} className="px-[20px] w-auto h-[40px] bg-[#0096FF] text-white rounded-[15px]">Edit Preset</button>
        </div>
    )
}

export default DailyTaskPreset
