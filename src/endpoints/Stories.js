import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { DeletePage } from "./Pages";

export async function GetStoryById (storyId) {
  try {
      const storyRef = doc(db, "Stories", storyId);
      const storySnap = await getDoc(storyRef)

      if(!storySnap.exists()){
        return
      }
      return(storySnap.data())
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};

export async function AddStory(worldId) {
  try {
    const storyRef = await addDoc(collection(db, "Stories"), {
        worldId,
        title: "New Story"
    })
    return storyRef.id
  } catch (error) {
    console.error("Failed to add Story: ", error);
  }
}

export async function UpdateStory(storyId, title, description) {
  try {
    const storyRef = doc(db, "Stories", storyId);
    await updateDoc(storyRef, {
      title,
      description,
    })
  } catch (error) {
    console.error("failed to update world: ", error);
  }
}

export async function DeleteStory(docId) {
  if (!docId)
    console.error("no docId provided.");
  try {
    const q = query(
        collection(db, "Pages"),
        where("storyId", "==", docId)
    );
    const PagesSnap = await getDocs(q);
    const PagesData = PagesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (PagesData.length > 0){
        PagesData.forEach(page => {
            DeletePage(page.id)
        });
    }

    await deleteDoc(doc(db, "Stories", docId));
  } catch (error) {
    console.error("failed to Remove world: ", error);
  }
}