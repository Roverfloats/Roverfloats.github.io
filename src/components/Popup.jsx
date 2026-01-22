function Popup({content}) {
    return (
        <div className="flex justify-center items-center w-full h-full absolute bottom-0 left-0 bg-[#00000080] ">
            <div className="w-[auto] h-auto rounded-[15px] p-[50px] bg-white dark:bg-[#171717]">
                {content}
            </div>
        </div>
    )
}

export default Popup
