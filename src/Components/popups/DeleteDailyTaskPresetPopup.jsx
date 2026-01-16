import { DeleteDailyTaskPreset } from "../../endpoints/Functions"

function DeleteDailyTaskPresetPopup({setReload, setPopup, taskPresetData}) {

    async function HandleDelete(){
        await DeleteDailyTaskPreset(taskPresetData.id).then();
        setReload(prev => !prev);
        setPopup(false);
    }

    return (
        <div className="w-[400px]">
            <p className="text-[25px] text-center">Are you sure you wanna delete this preset?</p>
            <div className="flex justify-between mt-[20px]">
                <button className="w-[150px] h-[40px] bg-[#0096FF] text-white rounded-[15px]" onClick={() => setPopup(false)}>No</button>
                <button className="w-[150px] h-[40px] border-2 border-[#D0D0D0] bg-white rounded-[15px]" onClick={() => HandleDelete()}>Yes</button>
            </div>
        </div>

    )
}

export default DeleteDailyTaskPresetPopup
