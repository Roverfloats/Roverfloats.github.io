import { getDocs } from "firebase/firestore";

export async function FetchData (query) {
  try {
      const snapshot = await getDocs(query);

      const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));

      if (data.length === 0) {
          return([]);
      }
      return(data)
  } catch (err) {
      console.error("Failed to fetch: ", err);
  }
};