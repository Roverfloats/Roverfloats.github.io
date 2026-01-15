import Header from '../Components/Header';
import DailyTaskPresetOverview from '../Components/tasks/DailyTaskPresetOverview';
import ManagableTaskOverview from '../Components/tasks/ManagableTaskOverview';

function Tasks({reload, setReload}) {

  return (
    <>
      <Header/>
      <div className='flex w-full h-auto divide-solid divide-x-2 divide-[#D0D0D0]'>
        <DailyTaskPresetOverview/>
        <ManagableTaskOverview/>
      </div>

    </>

  )
}

export default Tasks
