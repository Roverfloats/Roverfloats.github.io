import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { AddDailyTask, DeleteDailyTask, FetchData } from "../../endpoints/Functions";
import { db } from "../../firebase";
import dayjs from "dayjs";
import DailyTask from "./DailyTask";

function DailyTaskOverview({setReload, reload, setPopup, setPopupContent}) {
    const navigate = useNavigate();

    const [dailyTaskPresetData, setDailyTaskPresetData] = useState([]);
    const [dailyTaskData, setDailyTaskData] = useState([]);

    const AddNewTask = async (preset) => {
        await AddDailyTask(preset.id, preset.title, preset.description);
    }

    const DeleteOldTask = async (docId) => {
        await DeleteDailyTask(docId);
    }

    const refreshDailies = async () => {
        let presetQ = collection(db, "DailyTaskPresets");
        presetQ = query(presetQ);
        await FetchData(presetQ, setDailyTaskPresetData).then();

        let dailiesQ = collection(db, "DailyTasks");
        dailiesQ = query(dailiesQ);
        await FetchData(dailiesQ, setDailyTaskData).then();

        dailyTaskPresetData.forEach(preset => {
        var currentTask = dailyTaskData.filter(x => x.presetId == preset.id)
            if(currentTask.length == 0){
                AddNewTask(preset)
                return
            }
            currentTask = currentTask[0];
            if(currentTask.day < dayjs().format("DD-MM-YYYY") && currentTask.completed){
                DeleteOldTask(currentTask.id);
                AddDailyTask(preset)
                return
            }
        }); 
    }

    useEffect(() => {
        refreshDailies();
    }, [reload]);

    useEffect(() => {
        refreshDailies();
    }, []);

    return (
        <div className="flex-1 h-auto px-[50px]">
                <div className="w-full h-[50px]">
                    <button className="h-[30px] text-[#0096FF]" onClick={() => navigate("/tasks")}>Manage Daily Tasks +</button>
                </div>
                {
                    dailyTaskData.map((dailyTask) => (
                        <DailyTask
                            key={dailyTask.id}
                            taskData={dailyTask}
                            setReload={setReload}
                            setPopup={setPopup}
                            setPopupContent={setPopupContent}
                        />
                    ))
                }
        </div>
    )
}

export default DailyTaskOverview
