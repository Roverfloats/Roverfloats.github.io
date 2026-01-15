import Header from '../Components/Header';
import { useNavigate } from "react-router";

function Settings() {
    let navigate = useNavigate();

  return (
    <>
        <Header/>
        <div>settings
        </div>
    </>

  )
}

export default Settings
