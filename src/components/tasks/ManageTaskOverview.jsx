import { collection, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { FetchData } from "../../endpoints/General";
import { useEffect, useState } from "react";
import ManageTask from "./ManageTask";

function ManageTaskOverview({reload, setReload, setPopup, setPopupContent}) {
    let navigate = useNavigate();

    const [taskPresetData, setTaskPresetData] = useState([]);

    useEffect(() => {
        const Fetch = async () => {
            let presetQ = collection(db, "Tasks");
            presetQ = query(presetQ);
            var tempRecurringTaskPresetData = await FetchData(presetQ);
            setTaskPresetData(tempRecurringTaskPresetData)
        }
        Fetch();
    }, [reload]);

    return (
        <div className="flex-1 h-auto px-[50px] mb-[20px]">
            <div className="w-full h-[50px]">
                <button
                    className="h-[30px] text-[#0096FF] dark:text-[#0065AD]"
                    onClick={() => navigate("/new-task")}
                >New Task +</button>
            </div>
            {
                taskPresetData.filter(x => !x.presetId).map((task) => (
                    <ManageTask
                        key={task.id}
                        taskData={task}
                        setReload={setReload}
                        setPopup={setPopup}
                        setPopupContent={setPopupContent}
                    />
                ))
            }
        </div>
    )
}

export default ManageTaskOverview
