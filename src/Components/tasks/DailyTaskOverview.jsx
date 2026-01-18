import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase";
import DailyTask from "./DailyTask";
import moment from "moment";
import { AddDailyTask, DeleteDailyTask } from "../../endpoints/DailyTask";
import { FetchData } from "../../endpoints/General";

function DailyTaskOverview({setReload, reload, setPopup, setPopupContent}) {
    var colors = JSON.parse(localStorage.getItem("colors"))
    const navigate = useNavigate();

    const [dailyTaskData, setDailyTaskData] = useState([]);

    const AddNewTask = async (preset) => {
        await AddDailyTask(preset.id, preset.title, preset.description);
    }

    const DeleteOldTask = async (docId) => {
        await DeleteDailyTask(docId);
    }

    const refreshDailies = async () => {
        //fetch old data
        let presetQ = collection(db, "DailyTaskPresets");
        presetQ = query(presetQ);
        var newDailyTaskPresetData = await FetchData(presetQ);

        let dailiesQ = collection(db, "DailyTasks");
        dailiesQ = query(dailiesQ);
        var newDailyTaskData = await FetchData(dailiesQ);

        //remove old completed tasks
        newDailyTaskData.forEach(task => {
            if(moment(task.day, "DD-MM-YYYY").isBefore(moment(), "day") && task.completed){
                DeleteOldTask(task.id)
            }
        })

        //add new tasks
        newDailyTaskPresetData.forEach(preset => {
            const exists = newDailyTaskData.some(x =>
                x.presetId === preset.id &&
                moment(x.day, "DD-MM-YYYY").isSameOrAfter(moment(), "day")
            );

            if (!exists) {
                AddNewTask(preset);
            }
        });

        //fetch fresh data
        setDailyTaskData(await FetchData(dailiesQ));
    }

    useEffect(() => {
        refreshDailies();
    }, [reload]);

    return (
        <div className="flex-1 h-auto px-[50px]">
            <div className="w-full h-[50px]">
                <button
                    className="h-[30px]" onClick={() => navigate("/tasks")}
                    style={{color: colors.blue}}
                >Manage Daily Tasks +</button>
            </div>
            <div
                className="divide-solid divide-y-2 divide-[var(--divide-color)]"
                style={{ '--divide-color': colors.border }}
            >
                <div>
                    <p style={{color: colors.text}}>Today's daily tasks</p>
                    {
                        dailyTaskData.filter(x => moment(x.day, "DD-MM-YYYY").isSame(moment(), "day") && !x.invisible).map((dailyTask) => (
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
                {
                dailyTaskData.filter(x => moment(x.day, "DD-MM-YYYY").isBefore(moment(), "day")).length != 0 ?
                <div>
                    <p className="mt-[10px]">Missed Tasks</p>
                    {
                        dailyTaskData.filter(x => moment(x.day, "DD-MM-YYYY").isBefore(moment(), "day")).map((dailyTask) => (
                        <DailyTask
                            key={dailyTask.id}
                            taskData={dailyTask}
                            setReload={setReload}
                            setPopup={setPopup}
                            setPopupContent={setPopupContent}
                        />
                    ))
                    }
                </div> : <></>
                }                 
            </div>
        </div>
    )
}

export default DailyTaskOverview
