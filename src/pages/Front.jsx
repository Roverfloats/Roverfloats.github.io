import Header from '../components/Header';
import TaskOverview from '../components/tasks/TaskOverview';

function Front({reload, setReload, setPopup, setPopupContent, allowSensitive}) {

  return (
    <>
        <Header allowSensitive={allowSensitive}/>
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2">
          <div className=''>
            <TaskOverview
              setReload={setReload}
              reload={reload}
              setPopup={setPopup}
              setPopupContent={setPopupContent}
            />
          </div>
          <div className=''>
          </div>
          <div className='md:col-span-2'></div>
        </div>

    </>

  )
}

export default Front
