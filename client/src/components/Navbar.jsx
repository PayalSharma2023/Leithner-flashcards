// Navbar.js
import { FaAngleDown } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { RiArticleLine } from "react-icons/ri";
import { TbCalendarEvent } from "react-icons/tb";
import { RiGalleryLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdNotificationsNone } from "react-icons/md";
import { MdTempleHindu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ activeIndex, handleLinkClick }) => {
  const authState = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const icons = [
    { component: <FiHome />, label: "Home", path: "/" },
    { component: <MdTempleHindu />, label: "Daily Rituals", path: "/daily-schedule" },
    { component: <RiArticleLine />, label: "Articles", path: "/articles" },
    { component: <TbCalendarEvent />, label: "Events", path: "/events" },
    { component: <RiGalleryLine />, label: "Gallery", path: "/gallery" },
  ];

  const handleClick = () => {
    navigate("/add")
  }
 
  return (
    <div className="relative bg-white z-20">
      <nav className=" lg:max-w-7xl w-full lg:mx-auto mx-auto ml-2 py-2 flex justify-between">
      <img src="/assets/svn.png" alt="" className="h-20 w-auto object-fill" />
      
      <div className="mt-6 poppins-medium items-center grid grid-cols-2 gap-2  max-h-6">
        <NavLink to='/login' className="border px-2 py-1 lg:text-sm text-[10px] rounded ">{authState.token ? "Logout" : "Login"}</NavLink>
        <div className="grid grid-cols-3  mr-4 items-center">
        <span className="py-2 px-1"><MdLanguage/></span>
        <span className="py-2 px-1"><MdNotificationsNone /></span>
        {authState.role=="admin"?  <button className="border p-1 rounded-full" onClick={handleClick}><IoMdAdd /></button>: <div className="hidden"></div>}
        </div>
      </div>
      
      
    </nav>

      <div className=" relative bg-bgc-400  z-20 px-4 py-4 ">
        <div className="flex  max-w-7xl mx-auto lg:ml-40 justify-center lg:space-x-8 space-x-2">
          {icons.map((icon, index) => (
            <NavLink
              to={icon.path}
              key={index}
              className={`lg:flex bg-bgc-400 px-2 lg:py-2 py-1 flex-row gap-1 items-center cursor-pointer ${
                activeIndex === index ? " border-b-2 text-yellow-200 border-yellow-200" : "text-white"
              }`}
              onClick={() => handleLinkClick(index)}
            >
              <div className="lg:text-2xl text-lg">{icon.component}</div>
              <span className="lg:text-sm text-[8px] lg:pr-8">{icon.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
