import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { UpdateDarkmode } from '../endpoints/Settings';

function Settings({ settingsData, setReload }) {
  const [darkModeSetting, setDarkModeSetting] = useState(false);

  async function UpdateSettings() {
    await UpdateDarkmode(darkModeSetting);
    setReload(prev => !prev);
  }

  useEffect(() => {
    const update = async () => {
      const darkMode = settingsData?.find(x => x.type === "DarkMode")?.value;
      if (typeof darkMode === "boolean") {
        setDarkModeSetting(darkMode);
      }
    }
    update()
  }, [settingsData]);

  return (
    <>
      <Header />
      <div className="px-[50px] flex flex-col">
        <div className="mb-[20px]">
          <p className="text-black dark:text-white">Darkmode</p>

          <label className="relative inline-block w-11 h-6 cursor-pointer">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={darkModeSetting}
              onChange={e => setDarkModeSetting(e.target.checked)}
            />
            <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out dark:bg-[#D0D0D0] peer-checked:bg-[#0096FF] dark:peer-checked:bg-[#0065AD] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
          </label>
        </div>

        <button
          className="w-[150px] h-[40px] rounded-[15px] text-white bg-[#0096FF] dark:bg-[#0065AD]"
          onClick={UpdateSettings}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default Settings;
