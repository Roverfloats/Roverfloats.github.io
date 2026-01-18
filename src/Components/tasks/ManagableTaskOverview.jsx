import { useNavigate } from "react-router";
import ManagableTask from "./ManagableTask";

function ManagableTaskOverview() {
    var colors = JSON.parse(localStorage.getItem("colors"))
    let navigate = useNavigate();

    return (
        <div className="flex-1 h-auto px-[50px]">
            <div className="w-full h-[50px]">
                <button
                    className="h-[30px]" onClick={() => navigate("/new-task")}
                    style={{
                        color: colors.blue
                    }}
                    
                    >New Task +</button>
            </div>
            <ManagableTask
                taskData={{id: "duyfbjhwse", title: "test", description: "test test test", location: "home", completed: false}}
            />
        </div>
    )
}

export default ManagableTaskOverview
