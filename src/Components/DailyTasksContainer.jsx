import DailyTask from "./DailyTask"
import { useNavigate } from "react-router";
import { useState, useEffect } from "react"
import { fetchDailyTasks } from "../endpoints/DailyTasks"
import { db } from "../firebase"
import { collection, query, orderBy } from "firebase/firestore"

function DailyTasksContainer() {
    const [dailyTaskData, setDailyTaskData] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        let q = query(collection(db, "DailyTasks"), orderBy("completed", "asc"))
        fetchDailyTasks(q, setDailyTaskData)
    }, [])

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
                />
            )
            :
            <div className="flex w-full justify-center">
                <p>Youre done with your daily tasks!</p>
            </div>
            
        
        
        }
        </div>
    )
}

export default DailyTasksContainer
