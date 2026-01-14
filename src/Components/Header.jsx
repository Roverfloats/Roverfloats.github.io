import Button from "./base-components/Button";
import { useNavigate } from "react-router";

function Header() {
    let navigate = useNavigate();

    const phone = true

    return (
        <>
            {phone ?
                <header className="flex justify-between w-full h-[50px] bg-[#00c3ff]">
                    <button className="bg-[#ff0000] w-[50px] h-[50px] mx-[50px]"></button>
                    <p>text</p>
                    <button className="bg-[#ff0000] w-[50px] h-[50px] mx-[50px]"></button>
                </header>

                :

                <header className="flex justify-between w-full h-[50px] bg-[#00c3ff]">
                    <p>text</p>
                    <div>
                        <button className="bg-[#ff0000] w-[50px] h-[50px] mx-[50px]"></button>
                        <button className="bg-[#ff0000] w-[50px] h-[50px] mx-[50px]"></button>
                    </div>
                </header>
            
            }

            <nav className="flex justify-center items-center w-full h-[50px]">
                <div className="ml-[40px]"/>
                <Button text={"Home"}/>
                <Button text={"Writing"}/>
                <div className="mr-[40px]"/>
            </nav>
        </>
    )
}

export default Header
