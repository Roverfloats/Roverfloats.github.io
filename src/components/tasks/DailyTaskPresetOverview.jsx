import { useNavigate } from "react-router";
import DailyTaskPreset from "./DailyTaskPreset";
import { db } from "../../firebase";
import { collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FetchData } from "../../endpoints/General";

function DailyTaskPresetOverview({reload, setReload, setPopup, setPopupContent}) {
    let navigate = useNavigate();

    const [dailyTaskPresetData, setDailyTaskPresetData] = useState([]);

    const FetchDailyTaskPresetData = async () => {
        let presetQ = collection(db, "DailyTaskPresets");
        presetQ = query(presetQ);
        var newDailyTaskPresetData = await FetchData(presetQ);
        setDailyTaskPresetData(newDailyTaskPresetData)
    }

    useEffect(() => {
        FetchDailyTaskPresetData();
    }, [reload]);

    return (
        <div className="flex-1 h-auto px-[50px] mb-[20px]">
            <div className="w-full h-[50px]">
                <button
                    className="h-[30px] text-[#0096FF] dark:text-[#0065AD]"
                    onClick={() => navigate("/new-daily-preset")}
                >New Daily Task Preset +</button>
            </div>
            {
                dailyTaskPresetData.map((dailyTaskPreset) => (
                    <DailyTaskPreset
                        key={dailyTaskPreset.id}
                        taskPresetData={dailyTaskPreset}
                        setReload={setReload}
                        setPopup={setPopup}
                        setPopupContent={setPopupContent}
                    />
                ))
            }
        </div>
    )
}

export default DailyTaskPresetOverview
