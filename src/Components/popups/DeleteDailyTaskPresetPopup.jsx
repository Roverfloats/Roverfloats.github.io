import { DeleteDailyTaskPreset } from "../../endpoints/Functions"

function DeleteDailyTaskPresetPopup({setReload, setPopup, taskPresetData}) {

    async function HandleDelete(){
        await DeleteDailyTaskPreset(taskPresetData.id).then();
        setReload(prev => !prev);
        setPopup(false);
    }

    return (
        <div className="flex flex-col w-[200px] md:w-[400px]">
            <p className="text-[25px] text-center">Are you sure you wanna delete this preset?</p>
            <div className="flex w-full flex-col md:flex-row md:justify-between items-center mt-[20px]">
                <button className="w-[150px] h-[40px] bg-[#0096FF] text-white rounded-[15px]" onClick={() => setPopup(false)}>No</button>
                <button className="w-[150px] h-[40px] border-2 border-[#D0D0D0] bg-white rounded-[15px] mt-[20px] md:mt-[0]" onClick={() => HandleDelete()}>Yes</button>
            </div>
        </div>

    )
}

export default DeleteDailyTaskPresetPopup
