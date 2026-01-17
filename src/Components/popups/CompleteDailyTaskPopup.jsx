import { CompleteDailyTask } from "../../endpoints/DailyTask";

function CompleteDailyTaskPopup({setReload, setPopup, taskData}) {

    async function HandleComplete(){
        await CompleteDailyTask(taskData.id).then();
        setPopup(false);
        setReload(prev => !prev);
    }

    return (
        <div className="flex flex-col w-[200px] md:w-[400px]">
            <p className="text-[25px] text-center">Is this task complete?</p>
            <div className="flex w-full flex-col md:flex-row md:justify-between items-center mt-[20px]">
                <button
                    className="w-[150px] h-[40px] border-2 border-[#D0D0D0] bg-white rounded-[15px]"
                    onClick={() => setPopup(false)}
                >No</button>
                <button
                    className="w-[150px] h-[40px] bg-[#0096FF] text-white rounded-[15px] mt-[20px] md:mt-[0]"
                    onClick={() => HandleComplete()}
                >Yes</button>
            </div>
        </div>
    )
}

export default CompleteDailyTaskPopup
