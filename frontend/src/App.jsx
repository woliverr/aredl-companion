import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Home from './pages/home'
import Profile from './pages/profile'
import Login from './pages/login'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
