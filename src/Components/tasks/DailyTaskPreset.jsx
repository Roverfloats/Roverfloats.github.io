import { useNavigate } from "react-router";
import DeleteDailyTaskPresetPopup from "../popups/DeleteDailyTaskPresetPopup";

function DailyTaskPreset({taskPresetData, setReload, setPopup, setPopupContent}) {
    const navigate = useNavigate();

         var darkColors = {background: "#171717", blue: "#0065AD", text: "#ffffff", textOpposite: "#000000", border: "#000000", red: "#DF121B", inputBackground: "#292929", textOnBlue: "#ffffff", green: "#008800", greenBorder:"#004700"}
  var lightColors = {background: "#ffffff", blue: "#0096FF", text: "#000000", textOpposite: "#ffffff", border: "#D0D0D0", red: "#DF121B", inputBackground: "#F4F4F4", textOnBlue: "#ffffff", green: "#00BC00", greenBorder:"#008800"}


    return (
        <div className="md:items-end flex-col md:flex-row justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] bg-[white] dark:bg-[#171717] border-[#D0D0D0] dark:border-black">
            <div>
                <div className="text-[25px] text-black dark:text-white">{taskPresetData.title}</div>
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
