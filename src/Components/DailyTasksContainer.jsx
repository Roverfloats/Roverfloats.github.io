import DailyTask from "./DailyTask"
import { useNavigate } from "react-router";
import { useState, useEffect } from "react"
import { fetchDailyTasks } from "../endpoints/DailyTasks"
import { db } from "../firebase"
import { collection, query, orderBy } from "firebase/firestore"

function DailyTasksContainer({ActivatePopup, DeactivatePopup, reload, setReload}) {
    const [dailyTaskData, setDailyTaskData] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        let q = query(collection(db, "DailyTasks"), orderBy("completed", "asc"))
        fetchDailyTasks(q, setDailyTaskData)
    }, [reload])

    return (
        <div className="w-full h-auto px-[50px]">
            <div className="w-full h-[50px]">
                <button className="h-[30px] text-[#0096FF]" onClick={() => navigate("/dailytasks")}>Manage Daily Tasks +</button>
            </div>
            {
            dailyTaskData.length > 0 ?
            dailyTaskData.map((task) => 
                <DailyTask
                    key={task.id}
                    taskData={task}
                    ActivatePopup={ActivatePopup}
                    DeactivatePopup={DeactivatePopup}
                    setReload={setReload}
                />
            )
            :
            <div className="flex w-full justify-center">
                <p>something went wrong fetching the dailies.</p>
            </div>
            
        
        
        }
        </div>
    )
}

export default DailyTasksContainer
