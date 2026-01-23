import Header from '../components/Header';
import ManageTaskOverview from '../components/tasks/ManageTaskOverview';
import RecurringTaskPresetOverview from '../components/tasks/RecurringTaskPresetOverview';

function Tasks({reload, setReload, setPopup, setPopupContent}) {

  return (
    <>
      <Header/>
      <div className='flex flex-col md:flex-row w-full h-auto divide-solid md:divide-x-2 md:divide-y-0 divide-y-2 divide-[#D0D0D0]'>
        <RecurringTaskPresetOverview
          reload={reload}
          setReload={setReload}
          setPopup={setPopup}
          setPopupContent={setPopupContent}
        />
        <ManageTaskOverview
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
