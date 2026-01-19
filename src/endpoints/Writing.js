import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function GetWorldbuildingPieceById (worldId) {
  try {
      const worldBuildingRef = doc(db, "Worldbuilding", worldId);
      const worldBuildingSnap = await getDoc(worldBuildingRef)

      if(!worldBuildingSnap.exists()){
        return
      }

      return(worldBuildingSnap.data())
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};