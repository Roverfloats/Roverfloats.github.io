import { useNavigate } from "react-router-dom"

function World({worldData}) {
    let navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(`/world/${worldData.id}`)} 
            className="flex h-auto w-[300px] border-2 rounded-[15px] mb-[20px] p-[20px] md:mr-[20px] border-[#D0D0D0] dark:border-black text-black dark:text-white">
            <div className="w-full flex flex-col items-center">
                <div className="text-start text-[25px]">{worldData.title}</div>
                <div className="text-wrap">{worldData.description}</div>
            </div>
        </button>
    )
}

export default World