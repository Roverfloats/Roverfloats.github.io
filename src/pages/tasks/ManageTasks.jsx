import Header from '../../components/Header';
import DailyTaskPresetOverview from '../../components/tasks/DailyTaskPresetOverview';

function Tasks({reload, setReload, setPopup, setPopupContent}) {

  return (
    <>
      <Header/>
      <div className='flex flex-col md:flex-row w-full h-auto divide-solid md:divide-x-2 md:divide-y-0 divide-y-2 divide-[#D0D0D0]'>
        <DailyTaskPresetOverview
          reload={reload}
          setReload={setReload}
          setPopup={setPopup}
          setPopupContent={setPopupContent}
        />
      </div>

    </>

  )
}

export default Tasks
