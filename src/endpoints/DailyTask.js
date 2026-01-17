import { deleteDoc, doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import moment from "moment";

export async function AddDailyTask(presetId, title, description) {
  try {
    await addDoc(collection(db, "DailyTasks"), {
      presetId,
      title,
      description,
      completed: false,
      invisible: false,
      day: moment().format("DD-MM-YYYY")
    })
  } catch (error) {
    console.error("Failed to add daily task preset: ", error);
  }
}

export async function UpdateDailyTask(presetId, taskId, title, description) {
  try {
    const dailyTaskPresetRef = doc(db, "DailyTasks", taskId);
    await updateDoc(dailyTaskPresetRef, {
      presetId,
      title,
      description,
    })
  } catch (error) {
    console.error("Couldnt Remove task: ", error);
  }
}

export async function CompleteDailyTask(taskId) {
  try {
    const dailyTaskPresetRef = doc(db, "DailyTasks", taskId);
    await updateDoc(dailyTaskPresetRef, {
      completed: true,
    })
  } catch (error) {
    console.error("Couldnt Remove task: ", error);
  }
}

export async function SetDailyTaskInvisible(taskId) {
  try {
    const dailyTaskPresetRef = doc(db, "DailyTasks", taskId);
    await updateDoc(dailyTaskPresetRef, {
      invisible: true
    })
  } catch (error) {
    console.error("Couldnt Remove task: ", error);
  }
}

export async function DeleteDailyTask(docId) {
  if (!docId)
    console.error("no docId provided.");
  try {
    await deleteDoc(doc(db, "DailyTasks", docId));
  } catch (error) {
    console.error("Couldnt Remove task: ", error);
  }
}