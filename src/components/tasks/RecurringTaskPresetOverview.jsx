import { useNavigate } from "react-router";
import { db } from "../../firebase";
import { collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FetchData } from "../../endpoints/General";
import RecurringTaskPreset from "./RecurringTaskPreset";

function RecurringTaskPresetOverview({reload, setReload, setPopup, setPopupContent}) {
    let navigate = useNavigate();

    const [recurringTaskPresetData, setRecurringTaskPresetData] = useState([]);

    useEffect(() => {
        const Fetch = async () => {
            let presetQ = collection(db, "RecurringTaskPresets");
            presetQ = query(presetQ);
            var tempRecurringTaskPresetData = await FetchData(presetQ);
            setRecurringTaskPresetData(tempRecurringTaskPresetData)
        }
        Fetch();
    }, [reload]);

    return (
        <div className="flex-1 h-auto px-[50px] mb-[20px]">
            <div className="w-full h-[50px]">
                <button
                    className="h-[30px] text-[#0096FF] dark:text-[#0065AD]"
                    onClick={() => navigate("/new-recurring-task-preset")}
                >New Recurring Task Preset +</button>
            </div>
            {
                recurringTaskPresetData.map((TaskPreset) => (
                    <RecurringTaskPreset
                        key={TaskPreset.id}
                        taskPresetData={TaskPreset}
                        setReload={setReload}
                        setPopup={setPopup}
                        setPopupContent={setPopupContent}
                    />
                ))
            }
        </div>
    )
}

export default RecurringTaskPresetOverview
