import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/Roverfloats.github.io" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
