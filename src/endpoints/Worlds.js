import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { DeleteStory } from "./Stories";

export async function GetWorldById (worldId) {
  try {
      const worldRef = doc(db, "Worldbuilding", worldId);
      const worldSnap = await getDoc(worldRef)

      if(!worldSnap.exists()){
        return
      }
      return(worldSnap.data())
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};

export async function AddWorld(title, description, content) {
  try {
    const worldRef = await addDoc(collection(db, "Worldbuilding"), {
      title,
      description,
      content,
    })
    return worldRef.id
  } catch (error) {
    console.error("Failed to add world: ", error);
  }
}

export async function UpdateWorld(worldId, title, description, content) {
  try {
    const worldRef = doc(db, "Worldbuilding", worldId);
    await updateDoc(worldRef, {
      title,
      description,
      content,
    })
    return worldRef.id
  } catch (error) {
    console.error("failed to update world: ", error);
  }
}

export async function DeleteWorld(docId) {
  if (!docId)
    console.error("no docId provided.");
  try {
    const q = query(
      collection(db, "Stories"),
      where("worldId", "==", docId)
    );
    const StoriesSnap = await getDocs(q);
    const StoriesData = StoriesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (StoriesData.length > 0){
      StoriesData.forEach(story => {
        DeleteStory(story.id)
      });
    }

    await deleteDoc(doc(db, "Worldbuilding", docId));
  } catch (error) {
    console.error("failed to Remove world: ", error);
  }
}