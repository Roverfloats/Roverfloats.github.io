import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import WritingOverview from '../../Components/writing/WritingOverview';
import { useEffect, useState } from 'react';
import { GetWorldbuildingPieceById } from '../../endpoints/Writing';
import { collection, query, where } from 'firebase/firestore';
import { FetchData } from '../../endpoints/General';
import { db } from '../../firebase';

function World() {
    var colors = JSON.parse(localStorage.getItem("colors"))
    const {id: worldId} = useParams();
    const navigate = useNavigate({});

    const [worldData, setWorldData] = useState([]);
    const [stories, setStories] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const Fetch = async () => {
            if(!worldId){
                console.error("no id found for this entry")
                navigate("/writing")
                return
            }
            setWorldData(await GetWorldbuildingPieceById(worldId));

            let q = collection(db, "Stories");
            q = query(q, where("worldId", "==", worldId));
            setStories(await FetchData(q))
        }
        Fetch();
    }, []);

  return (
    <>
        <Header/>
        <div className='px-[50px]'>
            <div className='w-full h-auto'>
                <div className='flex flex-col w-full h-auto mb-[20px]'>
                    <p className='flex justify-center md:justify-start text-[25px] mb-[10px]'>{worldData.title}</p>
                    <p className='flex items-end'>{worldData.description}</p>
                </div>
                <div
                    className={`flex flex-col items-start p-[20px] border-2 rounded-[15px] w-full ${showAll ? "h-auto" : "h-[100px]"}`}
                    style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                    }}
                >
                    <p className={`${showAll ? "" : "line-clamp-1"}`}>{worldData.world}</p>
                    <button 
                        className='mt-[10px]'
                        style={{color: colors.blue}}
                        onClick={() => setShowAll(!showAll)}
                        >{showAll ? "Show Less -" : "Show More +"}</button>
                </div>
                <button></button>
            </div>
        </div>
    </>

  )
}

export default World
