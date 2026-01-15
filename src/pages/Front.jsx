import Header from '../Components/Header';
import { useNavigate } from "react-router";
import { useEffect } from 'react';
import DailyTasksContainer from '../components/DailyTasksContainer';

function Front() {
    let navigate = useNavigate();

  return (
    <>
        <Header/>
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2">
          <div className="h-[500px] bg-[#ff0000]">
            <DailyTasksContainer/>

          </div>
          <div className="h-[500px] bg-[#00ff00]">Box 2</div>
          <div className="h-[500px] bg-[#0000ff] md:col-span-2">Box 3</div>
        </div>

    </>

  )
}

export default Front
