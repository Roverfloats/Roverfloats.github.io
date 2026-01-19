import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Front from './pages/Front';
import Settings from './pages/Settings';
import { useEffect, useState } from "react";
import Popup from "./Components/Popup";
import ManageTasks from "./pages/tasks/ManageTasks";
import NewOrEditTask from "./pages/tasks/NewOrEditTask";
import AuthWrapper from "./AuthWrapper";
import Writing from "./pages/writing/Writing";
import World from "./pages/writing/World";

function App() {
  const [popup, setPopup] = useState(false)
  const [popupContent, setPopupContent] = useState(null)
  const [reload, setReload] = useState(null)

  const [darkMode, setDarkMode] = useState(false)
  var darkColors = {background: "#171717", blue: "#0065AD", text: "#ffffff", textOpposite: "#000000", border: "#000000", red: "#DF121B", inputBackground: "#292929", textOnBlue: "#ffffff", green: "#008800", greenBorder:"#004700"}
  var lightColors = {background: "#ffffff", blue: "#0096FF", text: "#000000", textOpposite: "#ffffff", border: "#D0D0D0", red: "#DF121B", inputBackground: "#F4F4F4", textOnBlue: "#ffffff", green: "#00BC00", greenBorder:"#008800"}

  function SetTheme(){
    var jsonColors
    jsonColors = JSON.stringify(darkColors)
    localStorage.setItem("colors", jsonColors);
    
    if(darkMode){
      jsonColors = JSON.stringify(darkColors)
      localStorage.setItem("colors", jsonColors);
    } else {
      jsonColors = JSON.stringify(lightColors)
      localStorage.setItem("colors", jsonColors);
    }
    var colors = JSON.parse(localStorage.getItem("colors"))
    document.documentElement.style.setProperty("--main-bg-color", colors.background);
  }


  useEffect(() => {
    SetTheme();
  }, [darkMode]);

  return (
    <AuthWrapper>
      <Routes>
        <Route
          path="/"
          element={<Login SetTheme={SetTheme}/>}
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
          path="/writing"
          element={<Writing/>}
        />

        <Route
          path="/world/:id"
          element={<World/>}
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
  )
}

export default App
