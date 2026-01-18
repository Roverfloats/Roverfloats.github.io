import moment from "moment";
import { DeleteDailyTask, SetDailyTaskInvisible } from "../../endpoints/DailyTask";

function SetDailyTaskInvisiblePopup({setReload, setPopup, taskData}) {
    var colors = JSON.parse(localStorage.getItem("colors"))

    async function HandleSetInvisible(){
        if(moment(taskData.day, "DD-MM-YYYY").isBefore(moment(), "day")){
            await DeleteDailyTask(taskData.id).then();
        }
        else{
            await SetDailyTaskInvisible(taskData.id).then();
        }
        setPopup(false)
        setReload(prev => !prev);
    }

    return (
        <div className="flex flex-col w-[200px] md:w-[400px]">
            <p
                className="text-[25px] text-center"
                style={{
                    color: colors.text
                }}
                >Are you sure you wanna remove this task for today?</p>
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
                    onClick={() => HandleSetInvisible()}
                >Yes</button>
            </div>
        </div>

    )
}

export default SetDailyTaskInvisiblePopup
