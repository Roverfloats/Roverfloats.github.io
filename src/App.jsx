import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Front from './pages/Front';
import Settings from './pages/Settings';
import { useState } from "react";
import Popup from "./Components/Popup";
import ManageTasks from "./pages/ManageTasks";

function App() {
  const [popup, setPopup] = useState(false)
  const [popupContent, setPopupContent] = useState(null)
  const [reload, setReload] = useState(null)

  function ActivatePopup(content){
    setPopupContent(content);
    setPopup(true);
  }

  function DeactivatePopup(){
    setPopupContent(null);
    setPopup(false);
  }

  return (
    <>
      <Routes >
        <Route path="/" element={<Login/>} />
        <Route path="/frontpage" element={<Front ActivatePopup={ActivatePopup} DeactivatePopup={DeactivatePopup} reload={reload} setReload={setReload}/>} />
        <Route path="/tasks" element={<ManageTasks reload={reload} setReload={setReload}/>} />
        <Route path="/edit-daily-preset/:id" element={<></>} />
        <Route path="/new-daily-preset" element={<></>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
      {
        popup ?
        <Popup content={popupContent} setReload={setReload}/> :
        <></>
      }
    </>
  )
}

export default App
