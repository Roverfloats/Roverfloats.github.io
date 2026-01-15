import Header from '../Components/Header';
import DailyTasksContainer from '../components/DailyTasksContainer';

function Front({ActivatePopup, DeactivatePopup, reload, setReload}) {

  return (
    <>
        <Header/>
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2">
          <div className="h-auto">
            <DailyTasksContainer ActivatePopup={ActivatePopup} DeactivatePopup={DeactivatePopup} reload={reload} setReload={setReload}/>

          </div>
          <div className="h-auto">Box 2</div>
          <div className="h-[500px] md:col-span-2">Box 3</div>
        </div>

    </>

  )
}

export default Front
