import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase";
import { FetchData } from "../../endpoints/General";
import World from "./World";

function WorldbuildingOverview({reload}) {
    const navigate = useNavigate();

    const [writingData, setWritingData] = useState([]);

    useEffect(() => {
        async function Fetch(){
            let q = collection(db, "Worldbuilding");
            q = query(q,);
            setWritingData(await FetchData(q));
        }
        Fetch();
    }, [reload]);

    return (
        <div className="flex-1 h-auto">
            <div className="w-full h-[50px]">
                <button className="h-[30px] text-[#0096FF] dark:text-[#0065AD]" onClick={() => navigate("/new-world")}>New World +</button>
            </div>
            <div className="divide-solid divide-y-2 ">
                <div className="flex flex-wrap justify-center">
                    {
                        writingData.map((worldData, i) => (
                            <World key={i} worldData={worldData}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WorldbuildingOverview