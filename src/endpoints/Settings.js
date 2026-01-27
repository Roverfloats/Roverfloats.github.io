import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function UpdateDarkmode(value) {
  try {
    const DarkmodeRef = doc(db, "Settings", "7GxpbVo7nYU11c7kGlsB");
    await updateDoc(DarkmodeRef, {
      value
    })
  } catch (error) {
    console.error("Couldnt update setting: ", error);
  }
}

export async function UpdateAllowSensitive(value) {
  try {
    const allowSensitiveRef = doc(db, "Settings", "HRMxxayVX8fKTM9BFt6I");
    await updateDoc(allowSensitiveRef, {
      value
    })
  } catch (error) {
    console.error("Couldnt update setting: ", error);
  }
}