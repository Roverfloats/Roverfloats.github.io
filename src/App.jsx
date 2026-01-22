import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Front from './pages/Front';
import Settings from './pages/Settings';
import { useState } from "react";
import Popup from "./components/Popup";
import ManageTasks from "./pages/ManageTasks";
import NewOrEditTask from "./pages/NewOrEditTask";
import AuthWrapper from "./AuthWrapper";

function App() {
  const [popup, setPopup] = useState(false)
  const [popupContent, setPopupContent] = useState(null)
  const [reload, setReload] = useState(null)
  const [darkMode, setDarkMode] = useState(false)




  
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
            path="/edit-daily-preset/:id"
            element={<NewOrEditTask
              isDailyTaskPreset={true}
              editing={true}
            />}
          />

          <Route
            path="/new-daily-preset"
            element={<NewOrEditTask
              isDailyTaskPreset={true}
              editing={false}
            />}
          />

          <Route
            path="/settings"
            element={<Settings setDarkMode={setDarkMode} darkMode={darkMode}/>}
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
