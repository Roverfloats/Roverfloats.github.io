import { CompleteDailyTask } from "../../endpoints/Functions"

function CompleteDailyTaskPopup({setReload, setPopup, taskData}) {

    async function HandleComplete(){
        await CompleteDailyTask(taskData.id).then();
        setPopup(false);
        setReload(prev => !prev);
    }

    return (
        <div className="w-[400px]">
            <p className="text-[25px] text-center">Is this task complete?</p>
            <div className="flex justify-between mt-[20px]">
                <button className="w-[150px] h-[40px] border-2 border-[#D0D0D0] bg-white rounded-[15px]" onClick={() => setPopup(false)}>No</button>
                <button className="w-[150px] h-[40px] bg-[#0096FF] text-white rounded-[15px]" onClick={() => HandleComplete()}>Yes</button>
            </div>
        </div>
    )
}

export default CompleteDailyTaskPopup
