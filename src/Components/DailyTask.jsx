function DailyTask({taskData}) {
    return (
        <div className={`flex justify-between items-center h-[50px] w-full border-2 rounded-[15px] mb-[20px] ${taskData.completed ? "border-[#008800] bg-[#00BC00]" : "border-[#D0D0D0] bg-white" }`}>
            <p className={`ml-[20px] ${taskData.completed ? "text-white" : "text-black"}`}>{taskData.title}</p>
            {
                taskData.completed ?
                <p className="mr-[20px] text-white">Completed</p>
                :
                <div>
                    <button className="bg-[#0000ff] h-[40px] w-[40px] cursor-pointer m-[10px]">
                        <img src="" alt="" />
                    </button>
                    <button className="bg-[#00ff00] h-[40px] w-[40px] cursor-pointer m-[10px] mr-[20px]">
                        <img src="" alt="" />
                    </button>
                </div>
            }
        </div>
    )
}

export default DailyTask
