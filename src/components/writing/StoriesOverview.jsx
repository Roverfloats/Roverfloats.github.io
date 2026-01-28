import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { FetchData } from "../../endpoints/General";
import Story from "./Story";

function StoriesOverview({ worldId, reload}) {
    const navigate = useNavigate();

    const [writingData, setWritingData] = useState([]);

    useEffect(() => {
        async function Fetch(){
            let q = collection(db, "Stories");
            q = query(q, where("worldId", "==", worldId));
            setWritingData(await FetchData(q));
        }
        Fetch();
    }, [reload]);

    return (
        <div className="flex-1 h-auto">
            <div className="w-full h-[50px]">
                <button className="h-[30px] text-[#0096FF] dark:text-[#0065AD]" onClick={() => navigate("/new-world")}>New Story +</button>
            </div>
            <div className="divide-solid divide-y-2 ">
                <div className="flex flex-wrap justify-center">
                    {
                        writingData.map((storyData, i) => (
                            <Story key={i} storyData={storyData}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default StoriesOverview