import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login"


export default function App() {
  return (
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
  )
}