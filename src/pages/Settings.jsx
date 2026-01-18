import Header from '../Components/Header';

function Settings({setDarkMode, darkMode}) {
  var colors = JSON.parse(localStorage.getItem("colors"))

  return (
    <>
        <Header/>
        <div className='px-[50px]'>
          <p style={{color: colors.text}}>darkmode on</p>
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
