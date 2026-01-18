import { useNavigate } from "react-router";

function ManagableTask({taskData}) {
    var colors = JSON.parse(localStorage.getItem("colors"))
    let navigate = useNavigate();

    return (
        <div
            className="items-end justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px]"
            style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
            }}
        >
            <div className="max-w-[400px]">
                <div className="text-[25px]">{taskData.title}</div>
                <div className="text-wrap">{taskData.description}</div>
                <div className="text-wrap">{taskData.location}</div>
            </div>
            <div>
                <button
                    onClick={() => navigate(`/edit-task/${taskData.id}`)}
                    className="px-[20px] w-auto h-[40px] rounded-[15px]"
                    style={{
                        backgroundColor: colors.blue,
                        color: colors.textOpposite,
                    }}
                >Edit Task</button>
            </div>
        </div>
    )
}

export default ManagableTask
