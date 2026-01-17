import { useNavigate } from "react-router";

import Settings from "../media/icons/SettingsWhite.png"

function Header() {
    let navigate = useNavigate();

    return (
        <>
            <header className="flex items-center justify-between w-full h-[50px] bg-[#0096FF]">
                <p className="ml-[50px] text-white">bitch</p>
                <div className="h-[40px] w-auto">
                    <button className="w-[40px] h-[40px] mr-[50px]" onClick={() => navigate("/settings")}>
                        <img src={Settings} alt="" />
                    </button>
                </div>
            </header>

            <nav className="flex justify-center items-center w-full h-[50px]">
                <div className="ml-[40px]"/>
                <button
                    onClick={() => navigate("/frontpage")} 
                    className="px-[20px] mx-[10px] w-auto h-[40px] bg-[#0096FF] text-white rounded-[15px]"
                >Home</button>
                <button
                    onClick={() => navigate("/tasks")}
                    className="px-[20px] mx-[10px] w-auto h-[40px] bg-[#0096FF] text-white rounded-[15px]"
                >tasks</button>
                <div className="mr-[40px]"/>
            </nav>
        </>
    )
}

export default Header
