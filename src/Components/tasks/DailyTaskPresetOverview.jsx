import { useNavigate } from "react-router";
import DailyTaskPreset from "./DailyTaskPreset";

function DailyTaskPresetOverview() {
    let navigate = useNavigate();

    return (
        <div className="flex-1 h-auto px-[50px]">
            <div className="w-full h-[50px]">
                <button className="h-[30px] text-[#0096FF]" onClick={() => navigate("/new-daily-preset")}>New Daily Task Preset +</button>
            </div>
            <DailyTaskPreset taskPresetData={{id: "duyfbjhwse", title: "test", discription: "test test test"}}/>
        </div>
    )
}

export default DailyTaskPresetOverview
