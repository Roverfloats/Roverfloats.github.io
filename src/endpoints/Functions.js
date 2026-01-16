import { getDocs, deleteDoc, doc, serverTimestamp, addDoc, collection, getDoc, setDoc, query, where, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import dayjs from "dayjs";

export async function FetchData (query, setData) {
  try {
      const snapshot = await getDocs(query);

      const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));

      if (data.length === 0) {
          setData([])
          return([]);
      }
      setData(data)
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};

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

export async function AddDailyTaskPreset(title, description) {
  try {
    const dailyTaskPresetRef = await addDoc(
      collection(db, "DailyTaskPresets"),
      {
        title,
        description,
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

export async function AddDailyTask(presetId, title, description) {
  try {
    await addDoc(collection(db, "DailyTasks"), {
      presetId,
      title,
      description,
      completed: false,
      day: dayjs().format("DD-MM-YYYY")
    })
  } catch (error) {
    console.error("Failed to add daily task preset: ", error);
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