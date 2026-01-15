function Popup({content}) {
    return (
        <div className="flex justify-center items-center w-full h-full absolute bottom-0 left-0 bg-[#00000080] ">
            <div className="w-[500px] h-auto rounded-[15px] bg-white p-[50px]">
                {content}
            </div>
        </div>
    )
}

export default Popup
