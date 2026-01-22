import Header from '../components/Header';

function Settings({setDarkMode, darkMode}) {
  return (
    <>
        <Header/>
        <div className='px-[50px]'>
          <p className='text-black dark:text-white'>darkmode on</p>
          <input
            type="checkbox"
            onChange={(e) => setDarkMode(e.target.checked)}
            checked={darkMode}
          />
        </div>
    </>

  )
}

export default Settings
