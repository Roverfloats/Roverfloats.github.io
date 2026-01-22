import { useNavigate } from "react-router";

function ManagableTask({taskData}) {
    let navigate = useNavigate();
    
    return (
        <div className="items-end justify-between flex h-auto w-full border-2 rounded-[15px] mb-[20px] p-[20px] bg-white dark:bg-[#171717] border-[#D0D0D0] dark:border-black">
            <div className="max-w-[400px]">
                <div className="text-[25px]">{taskData.title}</div>
                <div className="text-wrap">{taskData.description}</div>
                <div className="text-wrap">{taskData.location}</div>
            </div>
            <div>
                <button
                    onClick={() => navigate(`/edit-task/${taskData.id}`)}
                    className="px-[20px] w-auto h-[40px] rounded-[15px] bg-[#0096FF] dark:bg-[#0065AD] text-white dark:text-black"
                >Edit Task</button>
            </div>
        </div>
    )
}

export default ManagableTask
