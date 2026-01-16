import { getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"

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

  export async function DeleteDailyTaskPreset(docId) {
    if (!docId)
      console.error("no docId provided.");
    try {
      await deleteDoc(doc(db, "DailyTaskPresets", docId));
    } catch (error) {
      console.error("Couldnt Remove Preset: ", error);
    }
  }