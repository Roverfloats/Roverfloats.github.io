import { getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"

export async function fetchDailyTasks (query, setData) {
    try {
        const dailiesSnap = await getDocs(query);

        const data = dailiesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (data.length === 0) {
            setData([])
            return([]);
        }
        setData(data)
    } catch (err) {
        console.error("fetchDailyTasks function failed: ", err);
    }
};

export async function SetDailyTaskToDone (taskId) {
    try {
        const taskRef = doc(db, "DailyTasks", taskId)
        await updateDoc(taskRef, {
            completed: true
        })

    } catch (err) {
        console.error("SetDailyTaskToDone function failed: ", err);
    }
};

export async function RemoveDailyTask (taskId) {
    try {
        await deleteDoc(doc(db, "DailyTasks", taskId))
    } catch (err) {
        console.error("RemoveDailyTask function failed: ", err);
    }
};