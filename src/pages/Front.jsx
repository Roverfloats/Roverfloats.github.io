import Header from '../Components/Header';
import { useNavigate } from "react-router";
import { useEffect } from 'react';

function Front() {
    let navigate = useNavigate();
    
    useEffect(() => {
        navigate("../")
    }, []);


  return (
    <>
        <Header/>
        <div>
        </div>
    </>

  )
}

export default Front
