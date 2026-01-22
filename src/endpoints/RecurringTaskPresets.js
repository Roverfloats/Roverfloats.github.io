import { getDocs, deleteDoc, doc, serverTimestamp, addDoc, collection, getDoc, setDoc, query, where } from "firebase/firestore";
import { db } from "../firebase"
import { AddTask, DeleteTask, UpdateTask } from "./Tasks";

export async function GetRecurringTaskPresetById (taskId) {
  try {
      const recurringTaskPresetRef = doc(db, "RecurringTaskPresets", taskId);
      const recurringTaskPresetSnap = await getDoc(recurringTaskPresetRef)

      if(!recurringTaskPresetSnap.exists()){
        return
      }
      return(recurringTaskPresetSnap.data())
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};

export async function AddRecurringTaskPreset(title, description, time) {
  try {
    const recurringTaskPresetRef = await addDoc(
      collection(db, "RecurringTaskPresets"),
      {
        title,
        description,
        ...(time !== undefined && { time }),
        lastUpdated: serverTimestamp(),
      }
    );

    await AddTask(recurringTaskPresetRef.id, title, description);
  } catch (error) {
    console.error("Failed to add recurring task preset:", error);
  }
}

export async function UpdateRecurringTaskPreset(presetId, title, description) {
  try {
    const recurringTaskPresetRef = doc(db, "RecurringTaskPresets", presetId);
    await setDoc(recurringTaskPresetRef, {
      title,
      description,
      lastUpdated: serverTimestamp()
    })

    const q = query(
      collection(db, "Tasks"),
      where("presetId", "==", presetId)
    );
    const TasksSnap = await getDocs(q);
    const TasksData = TasksSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (TasksData.length === 0) {
        return;
    }

    TasksData.forEach(Task => {
      UpdateTask(presetId, Task.id, title, description)
    });

  } catch (error) {
    console.error("Failed to add recurring task preset: ", error);
  }
}

export async function DeleteRecurringTaskPreset(docId) {
  if (!docId)
    console.error("no docId provided.");
  try {
    const q = query(
      collection(db, "Tasks"),
      where("presetId", "==", docId)
    );
    const tasksSnap = await getDocs(q);
    const tasksData = tasksSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    await deleteDoc(doc(db, "RecurringTaskPresets", docId));

    if (tasksData.length === 0) {
        return;
    }
    tasksData.forEach(task => {
      DeleteTask(task.id)
    });
  } catch (error) {
    console.error("Couldnt Remove Preset: ", error);
  }
}
