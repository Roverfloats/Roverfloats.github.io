import DailyTask from "./DailyTask"
import { useState, useEffect } from 'react';
import { fetchDailyTasks } from "../endpoints/DailyTasks"
import { db } from "../firebase";
import { collection, query,  orderBy } from "firebase/firestore";

function DailyTasksContainer() {
    const [dailyTaskData, setDailyTaskData] = useState([]);

    useEffect(() => {
        let q = collection(db, "DailyTasks");
        q = query(q,
            orderBy('completed')
        );
        fetchDailyTasks(q, setDailyTaskData).then()
        console.log(dailyTaskData)
    }, []);







    return (
        <div className="w-full h-auto">
            {dailyTaskData.map((task) => {
                <DailyTask taskData={task}/>
            })}
        </div>
    )
}

export default DailyTasksContainer
