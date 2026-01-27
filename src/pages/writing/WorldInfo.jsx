import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { GetWorldById } from '../../endpoints/Worlds';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteWorldPopup from '../../components/popups/DeleteWorldPopup';

function WorldInfo({reload, setReload, setPopup, setPopupContent, allowSensitive}) {
  const navigate = useNavigate({});
  const {id: worldId} = useParams();

  const [worldData, setWorldData] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
      if (!worldId) return;
      const fetchData = async () => {
          const preexistingData = await GetWorldById(worldId)

          setWorldData(preexistingData);

      };
      if(worldId) fetchData();
  }, [reload]);

  return (
    <>
        <Header allowSensitive={allowSensitive}/>
        <div className="w-full h-auto px-[50px]">
          <div className='flex flex-col items-center w-full mb-[20px]'>
            <p className='text-[25px] text-black dark:text-white'>{worldData.title}</p>
            <p className='text-black dark:text-white'>{worldData.description}</p>
          </div>

          <div className={`flex flex-col items-start p-[20px] border-2 border-[#D0D0D0] dark:border-black rounded-[15px] w-full ${showAll ? "h-auto" : "h-[100px]"}`}>
            <p className={`${showAll ? "" : "line-clamp-1"} text-black dark:text-white`}>{worldData.content}</p>
            <button className='text-[#0096FF] dark:text-[#0065AD] mt-[10px]' onClick={() => setShowAll(!showAll)}>{showAll ? "Show Less -" : "Show More +"}</button>
          </div>
          <div className='flex flex-col md:flex-row w-full items-center md:justify-center mt-[10px]'>
            <button
              onClick={() => navigate(`/edit-world/${worldId}`)}
              className="px-[20px] w-[150px] h-[40px] rounded-[15px] mb-[10px] md:mb-0 md:my-[0] md:mr-[40px] bg-[#0096FF] dark:bg-[#0065AD] text-white"
            >Edit World</button>
            <button
              onClick={() => {setPopupContent(
                <DeleteWorldPopup
                  setReload={setReload}
                  setPopup={setPopup}
                  worldId={worldId}
                />
              ), setPopup(true)}
              }
              className="px-[20px] w-[150px] h-[40px] border-2 rounded-[15px] text-black dark:text-white border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717]"
            >Delete World</button>
          </div>
        </div>
    </>
  )
}

export default WorldInfo
