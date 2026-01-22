import { CompleteTask } from "../../endpoints/Tasks";

function CompleteTaskPopup({setReload, setPopup, taskData}) {
    async function HandleComplete(){
        await CompleteTask(taskData.id).then();
        setPopup(false);
        setReload(prev => !prev);
    }

    return (
        <div className="flex flex-col w-[200px] md:w-[400px]">
            <p className="text-[25px] text-center text-black dark:text-white">Is this task complete?</p>
            <div className="flex w-full flex-col md:flex-row md:justify-between items-center mt-[20px]">
                <button
                    className="w-[150px] h-[40px] border-2 rounded-[15px] border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717] text-black dark:text-white"
                    onClick={() => setPopup(false)}
                >No</button>
                <button
                    className="w-[150px] h-[40px] rounded-[15px] mt-[20px] md:mt-[0] text-white bg-[#0096FF] dark:bg-[#0065AD]"
                    onClick={() => HandleComplete()}
                >Yes</button>
            </div>
        </div>
    )
}

export default CompleteTaskPopup
