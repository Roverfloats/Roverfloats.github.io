import { getDocs } from "firebase/firestore";

export async function fetchDailyTasks (query, setData) {
    try {
        const verlofSnap = await getDocs(query);

        //document id toevoegen aan data
        const data = verlofSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        //als er geen data is, weergeef meegegeven waarshuwingstekst
        if (data.length === 0) {
            setData([])
            return([]);
        }
        setData([data])
    } catch (err) {
        console.error("", err);
    }
};