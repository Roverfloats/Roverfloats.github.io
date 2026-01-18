import { DeleteDailyTaskPreset } from "../../endpoints/DailyTaskPreset";

function DeleteDailyTaskPresetPopup({setReload, setPopup, taskPresetData}) {
    var colors = JSON.parse(localStorage.getItem("colors"))

    async function HandleDelete(){
        await DeleteDailyTaskPreset(taskPresetData.id).then();
        setReload(prev => !prev);
        setPopup(false);
    }

    return (
        <div className="flex flex-col w-[200px] md:w-[400px]">
            <p 
                className="text-[25px] text-center"
                style={{
                    color: colors.text
                }}
            >Are you sure you wanna delete this preset?</p>
            <div className="flex w-full flex-col md:flex-row md:justify-between items-center mt-[20px]">
                <button
                    className="w-[150px] h-[40px] rounded-[15px]"
                    style={{
                        color: colors.textOnBlue,
                        backgroundColor: colors.blue
                    }}
                    onClick={() => setPopup(false)}
                >No</button>
                <button 
                    className="w-[150px] h-[40px] border-2 rounded-[15px] mt-[20px] md:mt-[0]"
                    style={{
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                        color: colors.text
                    }}
                    onClick={() => HandleDelete()}
                >Yes</button>
            </div>
        </div>

    )
}

export default DeleteDailyTaskPresetPopup
