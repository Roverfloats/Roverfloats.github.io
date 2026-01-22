import { useNavigate } from "react-router-dom"

function WorldbuildingPiece({worldData}) {
    var colors = JSON.parse(localStorage.getItem("colors"))
    let navigate = useNavigate();

    return (
        <button
        onClick={() => navigate(`/world/${worldData.id}`)}
            className="flex h-auto w-[300px] border-2 rounded-[15px] mb-[20px] p-[20px] md:mr-[20px]"
            style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
            }}>
            <div
                className="w-full flex flex-col items-center"
                style={{color: colors.text}}
            >
                <div className="text-start text-[25px]">{worldData.title}</div>
                <div className="text-wrap">{worldData.description}</div>
            </div>
        </button>
    )
}

export default WorldbuildingPiece
