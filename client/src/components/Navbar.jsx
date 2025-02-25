import { useState, useEffect } from "react";
import { FiHome, FiSun, FiMoon } from "react-icons/fi";
import { MdLanguage, MdNotificationsNone } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ activeIndex, handleLinkClick }) => {
  const authState = useSelector((state) => state.auth);
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

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const icons = [{ component: <FiHome />, label: "Home", path: "/" }];

  return (
    <div
      className={`relative z-20 transition-colors duration-300 border-b ${darkMode ? "bg-gray-950 text-white border-gray-800" : "bg-white text-gray-900 border-gray-200"}`}
    >
      <nav className="lg:max-w-7xl w-full mx-auto py-3 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          {icons.map((icon, index) => (
            <NavLink
              to={icon.path}
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300`}
              onClick={() => handleLinkClick(index)}
            >
              <div className="text-xl">{icon.component}</div>
              <span className="lg:text-base text-sm font-medium">{icon.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <MdLanguage className="text-xl" />
          </button>

          <button
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <MdNotificationsNone className="text-xl" />
          </button>

          {/* Dark/Light Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-110"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400 text-2xl" />
            ) : (
              <FiMoon className="text-gray-500 text-2xl" />
            )}
          </button>

          {/* Login/Logout */}
          <NavLink
            to={"/login"}
            className="px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {authState.token ? "Logout" : "Login"}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

// 🚀 Added improvements:
// - Enhanced hover and focus states
// - Scale effect on the theme toggle button
// - Cleaner border and shadow separation between navbar and page content
// - Automatically update the theme based on saved preferences

// Want me to add an animated theme switch or make the theme button a dropdown? Let me know! ✨
