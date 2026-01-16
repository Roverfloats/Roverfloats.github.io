import Header from '../Components/Header';
import DailyTaskOverview from '../Components/tasks/DailyTaskOverview';

function Front({reload, setReload, setPopup, setPopupContent}) {

  return (
    <>
        <Header/>
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2">
          <div className=''>
            <DailyTaskOverview setReload={setReload} reload={reload} setPopup={setPopup} setPopupContent={setPopupContent}/>
          </div>
          <div className=''></div>
          <div className='md:col-span-2'></div>
        </div>

    </>

  )
}

export default Front
