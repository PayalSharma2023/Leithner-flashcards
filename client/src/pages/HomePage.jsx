import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300 bg-background text-text">

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 p-3 rounded-full transition-all duration-300 hover:bg-secondary/20"
      >
        {darkMode ? <FiSun className="text-yellow-400 text-2xl" /> : <FiMoon className="text-gray-500 text-2xl" />}
      </button>

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center px-6">
        <h1 className="text-4xl font-bold md:text-6xl text-primary">
          Master Your Learning
        </h1>
        <p className="mt-4 text-lg text-secondary">
          Use the **Leitner System** to memorize anything efficiently.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex space-x-6">
        <button onClick={() => navigate("/create")} className="px-6 py-3 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-secondary transition-all duration-300">
          Create Flashcard
        </button>
        <button onClick={() => navigate("/study")} className="px-6 py-3 bg-secondary text-white rounded-lg text-lg font-semibold hover:bg-primary transition-all duration-300">
          Study
        </button>
      </motion.div>

    </div>
  );
};

export default HomePage;
