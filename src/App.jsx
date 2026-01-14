import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Front from './pages/Front';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Login/>} />
          <Route path="/frontpage" element={<Front/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
