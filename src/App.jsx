import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Front from './pages/Front';
import Settings from './pages/Settings';
import { useEffect, useState } from "react";
import Popup from "./components/Popup";
import ManageTasks from "./pages/ManageTasks";
import NewOrEditTask from "./pages/NewOrEditTask";
import AuthWrapper from "./AuthWrapper";
import { FetchData } from "./endpoints/General";
import { collection, query } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [popup, setPopup] = useState(false)
  const [popupContent, setPopupContent] = useState(null)
  const [reload, setReload] = useState(null)
  const [settings, setSettings] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  async function Fetch(){
    let q = collection(db, "Settings");
    q = query(q);
    var settingsData = await FetchData(q);
    setSettings(settingsData)
    setDarkMode(settingsData?.find(x => x.type === "DarkMode")?.value)
  }

  useEffect(() => {
    Fetch()
  }, [reload]);

  return (
    <div className={`h-full w-full bg-white dark:bg-[#171717] ${darkMode ? "dark" : ""}`}>
      <AuthWrapper>
        <Routes>
          <Route
            path="/"
            element={<Login/>}
          />

          <Route
            path="/frontpage"
            element={<Front
              reload={reload}
              setReload={setReload}
              setPopup={setPopup}
              setPopupContent={setPopupContent}
            />}
          />

          <Route
            path="/tasks"
            element={<ManageTasks
              reload={reload}
              setReload={setReload}
              setPopup={setPopup}
              setPopupContent={setPopupContent}
            />} 
          />

          <Route
            path="/edit-recurring-task-preset/:id"
            element={<NewOrEditTask
              isRecurringTaskPreset={true}
              editing={true}
            />}
          />

          <Route
            path="/new-recurring-task-preset"
            element={<NewOrEditTask
              isRecurringTaskPreset={true}
              editing={false}
            />}
          />

          <Route
            path="/new-task"
            element={<NewOrEditTask
              isRecurringTaskPreset={false}
              editing={false}
            />}
          />

          <Route
            path="/edit-task/:id"
            element={<NewOrEditTask
              isRecurringTaskPreset={false}
              editing={true}
            />}
          />

          <Route
            path="/settings"
            element={<Settings setReload={setReload} settingsData={settings} />}
          />
        </Routes>
        {
          popup ?
          <Popup content={popupContent}/> :
          <></>
        }
      </AuthWrapper>
    </div>
  )
}

export default App
