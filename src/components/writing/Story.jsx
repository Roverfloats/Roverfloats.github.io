import { useNavigate } from "react-router-dom"

function Story({storyData}) {
    let navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(`/story/${storyData.id}`)} 
            className="flex h-auto w-[300px] border-2 rounded-[15px] mb-[20px] p-[20px] md:mr-[20px] border-[#D0D0D0] dark:border-black text-black dark:text-white">
            <div className="w-full flex flex-col items-center">
                <div className="text-start text-[25px]">{storyData.title}</div>
                <div className="text-wrap">{storyData.description}</div>
            </div>
        </button>
    )
}

export default Story