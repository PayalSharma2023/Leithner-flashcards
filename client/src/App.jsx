import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

//pages
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Navbar from "./components/Navbar";
//components
import AddFlashCard from "./components/flashcard/AddFlashCard";
import Study from "./pages/Study";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";

// import { useSelector } from "react-redux";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/create" element={<AddFlashCard />} />
        <Route path="/study" element={<Study />} />
      </Routes>
    </Router>
  );
}

export default App;
