import Header from '../Components/Header';
import DailyTaskPresetOverview from '../Components/tasks/DailyTaskPresetOverview';
import ManagableTaskOverview from '../Components/tasks/ManagableTaskOverview';

function Tasks({reload, setReload, setPopup, setPopupContent}) {

  return (
    <>
      <Header/>
      <div className='flex flex-col md:flex-row w-full h-auto divide-solid divide-x-2 divide-[#D0D0D0]'>
        <DailyTaskPresetOverview reload={reload} setReload={setReload} setPopup={setPopup} setPopupContent={setPopupContent}/>
        <ManagableTaskOverview/>
      </div>

    </>

  )
}

export default Tasks
