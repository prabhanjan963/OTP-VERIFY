import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Otp from "./components/Otp";
import Signin from "./components/Signin";
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <>
    <Toaster/>
       <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/" element={<Signin/>} />
       </Routes>
    </>
  )
}
