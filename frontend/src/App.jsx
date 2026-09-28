import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router";
import './App.css'
import Home from './pages/home'
import Profile from './pages/profile'
import Login from './pages/login'
import Navbar from './components/Navbar'


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
