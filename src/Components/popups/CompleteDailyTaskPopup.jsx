import { CompleteDailyTask } from "../../endpoints/DailyTask";

function CompleteDailyTaskPopup({setReload, setPopup, taskData}) {
    var colors = JSON.parse(localStorage.getItem("colors"))

    async function HandleComplete(){
        await CompleteDailyTask(taskData.id).then();
        setPopup(false);
        setReload(prev => !prev);
    }

    return (
        <div className="flex flex-col w-[200px] md:w-[400px]">
            <p
                className="text-[25px] text-center"
                style={{
                    color: colors.text
                }}
                >Is this task complete?</p>
            <div className="flex w-full flex-col md:flex-row md:justify-between items-center mt-[20px]">
                <button
                    className="w-[150px] h-[40px] border-2 rounded-[15px]"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                        color: colors.text
                    }}
                    onClick={() => setPopup(false)}
                >No</button>
                <button
                    className="w-[150px] h-[40px] rounded-[15px] mt-[20px] md:mt-[0]"
                    style={{
                        color: colors.textOnBlue,
                        backgroundColor: colors.blue
                    }}
                    onClick={() => HandleComplete()}
                >Yes</button>
            </div>
        </div>
    )
}

export default CompleteDailyTaskPopup
