import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { FetchData } from "./General";

export async function AddPage(storyId) {
  try {
    let q = collection(db, "Pages");
    q = query(q, where("storyId", "==", storyId));
    var pagesData = (await FetchData(q));

    var maxEntry
    if(pagesData.length > 0){
        maxEntry = [...pagesData].sort((a, b) => b.number - a.number)[0].number;
    }
    else{
        maxEntry = 0
    }

    const storyRef = await addDoc(collection(db, "Pages"), {
        storyId,
        content: "new page",
        number: maxEntry+1
    })
    return storyRef.id
  } catch (error) {
    console.error("Failed to add Story: ", error);
  }
}

export async function UpdatePage(pageId, content) {
  try {
    const storyRef = doc(db, "Pages", pageId);
    await updateDoc(storyRef, {
      content
    })
  } catch (error) {
    console.error("failed to update world: ", error);
  }
}

export async function DeletePage(docId) {
  if (!docId)
    console.error("no docId provided.");
  try {
    await deleteDoc(doc(db, "Pages", docId));
  } catch (error) {
    console.error("failed to Remove world: ", error);
  }
}