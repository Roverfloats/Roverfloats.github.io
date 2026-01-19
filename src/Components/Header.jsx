import { useNavigate } from "react-router";

import Settings from "../media/icons/SettingsWhite.png"
import { useEffect, useState } from "react";

function Header() {
    const [colors, setColors] = useState(JSON.parse(localStorage.getItem("colors")));

    useEffect(() => {
        async function UpdateColors(){
            setColors(JSON.parse(localStorage.getItem("colors")))            
        }
        UpdateColors()
    }, []);

    let navigate = useNavigate();

    return (
        <>
            <header
                className="flex items-center justify-between w-full h-[50px]"
                style={{
                    backgroundColor: colors.blue,
                }}
            >
                <p className="ml-[50px] text-white">bitch</p>
                <div className="h-[40px] w-auto">
                    <button className="w-[40px] h-[40px] mr-[50px]" onClick={() => navigate("/settings")}>
                        <img src={Settings} alt="" />
                    </button>
                </div>
            </header>

            <nav className="flex md:justify-center items-center w-full h-[50px] overflow-x-scroll no-scrollbar">
                <div className="ml-[40px]"/>
                <button
                    onClick={() => navigate("/frontpage")} 
                    className="px-[20px] mx-[10px] w-auto h-[40px] rounded-[15px]"
                    style={{
                        backgroundColor: colors.blue,
                        color: colors.textOnBlue,
                    }}
                >Home</button>
                <button
                    onClick={() => navigate("/tasks")}
                    className="px-[20px] mx-[10px] w-auto h-[40px] rounded-[15px]"
                    style={{
                        backgroundColor: colors.blue,
                        color: colors.textOnBlue,
                    }}
                >tasks</button>
                <button
                    onClick={() => navigate("/writing")}
                    className="px-[20px] mx-[10px] w-auto h-[40px] rounded-[15px]"
                    style={{
                        backgroundColor: colors.blue,
                        color: colors.textOnBlue,
                    }}
                >Writing</button>
            </nav>
        </>
    )
}

export default Header
