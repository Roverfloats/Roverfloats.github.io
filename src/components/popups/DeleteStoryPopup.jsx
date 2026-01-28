import { useNavigate } from "react-router-dom";
import { DeleteStory } from "../../endpoints/Stories";

function DeleteStoryPopup({setPopup, storyId}) {
    const navigate = useNavigate({});
    async function HandleDelete(){
        await DeleteStory(storyId).then();
        setPopup(false);
        navigate("/worldbuilding-collection")
    }

    return (
        <div className="flex flex-col w-[200px] md:w-[400px]">
            <p className="text-[25px] text-center text-black dark:text-white">Are you sure you wanna delete this story?</p>
            <div className="flex w-full flex-col md:flex-row md:justify-between items-center mt-[20px]">
                <button
                    className="w-[150px] h-[40px] rounded-[15px] text-white bg-[#0096FF] dark:bg-[#0065AD]"
                    onClick={() => setPopup(false)}
                >No</button>
                <button 
                    className="w-[150px] h-[40px] border-2 rounded-[15px] mt-[20px] md:mt-[0] border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717] text-black dark:text-white"
                    onClick={() => HandleDelete()}
                >Yes</button>
            </div>
        </div>

    )
}

export default DeleteStoryPopup
