import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import { FetchData } from "../../endpoints/General";
import { AddTask, DeleteTask } from "../../endpoints/Tasks";
import Tasks from "./Task";
import Task from "./Task";

function TaskOverview({setReload, reload, setPopup, setPopupContent}) {
    const navigate = useNavigate();

    const [recurringTaskData, setRecurringTaskData] = useState([]);

    const AddNewTask = async (preset) => {
        await AddTask(preset.id, preset.title, preset.description);
    }

    const DeleteOldTask = async (docId) => {
        await DeleteTask(docId);
    }

    const refreshDailies = async () => {
        //fetch old data
        let presetQ = collection(db, "RecurringTaskPresets");
        presetQ = query(presetQ);
        var recurringTaskPresetData = await FetchData(presetQ);

        let dailiesQ = collection(db, "Tasks");
        dailiesQ = query(dailiesQ);
        var recurringTaskData = await FetchData(dailiesQ);

        //remove old completed tasks
        recurringTaskData.forEach(task => {
            if(moment(task.day, "DD-MM-YYYY").isBefore(moment(), "day") && task.completed){
                DeleteOldTask(task.id)
            }
        })

        //add new tasks
        recurringTaskPresetData.forEach(preset => {
            const exists = recurringTaskData.some(x =>
                x.presetId === preset.id &&
                moment(x.day, "DD-MM-YYYY").isSameOrAfter(moment(), "day")
            );

            if (!exists) {
                AddNewTask(preset);
            }
        });

        //fetch fresh data
        setRecurringTaskData(await FetchData(dailiesQ));
    }

    useEffect(() => {
        refreshDailies();
    }, [reload]);

    return (
        <div className="flex-1 h-auto px-[50px]">
            <div className="w-full h-[50px]">
                <button
                    className="h-[30px] text-[#0096FF] dark:text-[#0065AD]"
                    onClick={() => navigate("/tasks")}
                >Manage Tasks +</button>
            </div>
            <div className="divide-solid divide-y-2 divide-[#D0D0D0] dark:divide-[black]">
                <div>
                    <p className="text-black dark:text-white">Today's tasks</p>
                    {
                        recurringTaskData.filter(x => moment(x.day, "DD-MM-YYYY").isSame(moment(), "day") && !x.invisible).map((task) => (
                            <Task
                                key={task.id}
                                taskData={task}
                                setReload={setReload}
                                setPopup={setPopup}
                                setPopupContent={setPopupContent}
                            />
                        ))
                    }                    
                </div>
                {
                recurringTaskData.filter(x => moment(x.day, "DD-MM-YYYY").isBefore(moment(), "day")).length != 0 ?
                <div>
                    <p className="mt-[10px]">Missed Tasks</p>
                    {
                        recurringTaskData.filter(x => moment(x.day, "DD-MM-YYYY").isBefore(moment(), "day")).map((task) => (
                        <Task
                            key={task.id}
                            taskData={task}
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

export default TaskOverview
