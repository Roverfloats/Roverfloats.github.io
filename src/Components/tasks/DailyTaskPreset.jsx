import { useNavigate } from "react-router";
import DeleteDailyTaskPresetPopup from "../popups/DeleteDailyTaskPresetPopup";

function DailyTaskPreset({taskPresetData, setReload, setPopup, setPopupContent}) {
    var colors = JSON.parse(localStorage.getItem("colors"))
    const navigate = useNavigate();

    return (
        <div
            className="md:items-end flex-col md:flex-row justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px]"
            style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
            }}
        >
            <div>
                <div
                    className="text-[25px]"
                    style={{
                        color: colors.text
                    }}
                >{taskPresetData.title}</div>
                <div
                    className="text-wrap"
                    style={{
                        color: colors.text
                    }}
                >{taskPresetData.description}</div>
            </div>
            <div className="flex flex-col md:flex-row md:w-[400px] md:justify-end">
                <button
                    onClick={() => navigate(`/edit-daily-preset/${taskPresetData.id}`)}
                    className="px-[20px] w-auto min-h-[40px] rounded-[15px] my-[10px] md:my-[0] md:mr-[10px]"
                    style={{
                        backgroundColor: colors.blue,
                        color: colors.textOnBlue,
                    }}
                >Edit Preset</button>
                <button
                    onClick={() => {setPopupContent(<DeleteDailyTaskPresetPopup
                        setReload={setReload}
                        setPopup={setPopup}
                        taskPresetData={taskPresetData}/>), setPopup(true)}}
                    className="px-[20px] w-auto min-h-[40px] border-2 rounded-[15px]"
                    style={{
                        color: colors.text,
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                    }}
                >Remove Preset</button>
            </div>

        </div>
    )
}

export default DailyTaskPreset
