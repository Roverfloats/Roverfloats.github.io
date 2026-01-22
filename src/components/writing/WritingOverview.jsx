import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase";
import { FetchData } from "../../endpoints/General";
import WorldbuildingPiece from "./WorldbuildingPiece";

function WritingOverview({setReload, reload, setPopup, setPopupContent}) {
    var colors = JSON.parse(localStorage.getItem("colors"))
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
                <button
                    className="h-[30px]" onClick={() => navigate("/frontpage")}
                    style={{color: colors.blue}}
                >New World +</button>
            </div>
            <div
                className="divide-solid divide-y-2 divide-[var(--divide-color)]"
                style={{ '--divide-color': colors.border }}
            >
                <div className="flex flex-wrap">
                    {
                        writingData.map((world) => (
                            <WorldbuildingPiece
                                key={world.id}
                                worldData={world}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WritingOverview
