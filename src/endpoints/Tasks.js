import { deleteDoc, doc, addDoc, collection, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import moment from "moment";

export async function GetTaskById (taskId) {
  try {
      const taskRef = doc(db, "Tasks", taskId);
      const taskSnap = await getDoc(taskRef)

      if(!taskSnap.exists()){
        return
      }
      return(taskSnap.data())
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};

export async function AddTask(presetId, title, description, time) {
  try {
    await addDoc(collection(db, "Tasks"), {
      ...(presetId !== undefined && { presetId }),
      title,
      description,
      ...(time !== undefined && { time }),
      completed: false,
      invisible: false,
      day: moment().format("DD-MM-YYYY")
    })
  } catch (error) {
    console.error("Failed to add task: ", error);
  }
}

export async function UpdateTask(presetId, taskId, title, description, time) {
  try {
    const TaskRef = doc(db, "Tasks", taskId);
    await updateDoc(TaskRef, {
      ...(presetId !== undefined && { presetId }),
      title,
      description,
      ...(time !== undefined && { time }),
    })
  } catch (error) {
    console.error("failed to update task: ", error);
  }
}

export async function CompleteTask(taskId) {
  try {
    const taskRef = doc(db, "Tasks", taskId);
    await updateDoc(taskRef, {
      completed: true,
    })
  } catch (error) {
    console.error("falied to edit task: ", error);
  }
}

export async function SetTaskInvisible(taskId) {
  try {
    const taskRef = doc(db, "Tasks", taskId);
    await updateDoc(taskRef, {
      invisible: true
    })
  } catch (error) {
    console.error("failed to edit task: ", error);
  }
}

export async function DeleteTask(docId) {
  if (!docId)
    console.error("no docId provided.");
  try {
    await deleteDoc(doc(db, "Tasks", docId));
  } catch (error) {
    console.error("failed to Remove task: ", error);
  }
}