import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import { useState } from "react";

//pages
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
//components
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";

// import { useSelector } from "react-redux";


function App() {
  return (
    <Router>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<SignUp/>}/>

      {/* {authState.role == "admin" ? <Route path="/add" element={<Add/>}/>: ""} */}
      
     </Routes>
    </Router>
  )
}

export default App
