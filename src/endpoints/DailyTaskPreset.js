import { getDocs, deleteDoc, doc, serverTimestamp, addDoc, collection, getDoc, setDoc, query, where } from "firebase/firestore";
import { db } from "../firebase"
import { AddDailyTask, DeleteDailyTask, UpdateDailyTask } from "./DailyTask";

export async function GetDailyTaskPresetById (taskId) {
  try {
      const dailyTaskPresetRef = doc(db, "DailyTaskPresets", taskId);
      const dailyTaskPresetSnap = await getDoc(dailyTaskPresetRef)

      if(!dailyTaskPresetSnap.exists()){
        return
      }


      return(dailyTaskPresetSnap.data())
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};

export async function AddDailyTaskPreset(title, description, time) {
  try {
    const dailyTaskPresetRef = await addDoc(
      collection(db, "DailyTaskPresets"),
      {
        title,
        description,
        time,
        lastUpdated: serverTimestamp(),
      }
    );

    await AddDailyTask(dailyTaskPresetRef.id, title, description);
  } catch (error) {
    console.error("Failed to add daily task preset:", error);
  }
}

export async function UpdateDailyTaskPreset(presetId, title, description) {
  try {
    const dailyTaskPresetRef = doc(db, "DailyTaskPresets", presetId);
    await setDoc(dailyTaskPresetRef, {
      title,
      description,
      lastUpdated: serverTimestamp()
    })

    const q = query(
      collection(db, "DailyTasks"),
      where("presetId", "==", presetId)
    );
    const dailyTasksSnap = await getDocs(q);
    const dailyTasksData = dailyTasksSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (dailyTasksData.length === 0) {
        return;
    }

    dailyTasksData.forEach(dailyTask => {
      UpdateDailyTask(presetId, dailyTask.id, title, description)
    });

  } catch (error) {
    console.error("Failed to add daily task preset: ", error);
  }
}

export async function DeleteDailyTaskPreset(docId) {
  if (!docId)
    console.error("no docId provided.");
  try {
    const q = query(
      collection(db, "DailyTasks"),
      where("presetId", "==", docId)
    );
    const dailyTasksSnap = await getDocs(q);
    const dailyTasksData = dailyTasksSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    await deleteDoc(doc(db, "DailyTaskPresets", docId));

    if (dailyTasksData.length === 0) {
        return;
    }
    dailyTasksData.forEach(dailyTask => {
      DeleteDailyTask(dailyTask.id)
    });
  } catch (error) {
    console.error("Couldnt Remove Preset: ", error);
  }
}
