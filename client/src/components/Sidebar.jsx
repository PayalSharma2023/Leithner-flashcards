import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { RiArticleLine } from "react-icons/ri";
import { TbCalendarEvent } from "react-icons/tb";
import { RiGalleryLine } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = ({ activeIndex, handleLinkClick }) => {
  const icons = [
    { component: <FiHome />, label: "Home", path: "/" },
    { component: <RiArticleLine />, label: "Articles", path: "/articles" },
    { component: <TbCalendarEvent />, label: "Events", path: "/events" },
    { component: <RiGalleryLine />, label: "Gallery", path: "/gallery" },
    {
      component: <MdNotificationsNone />,
      label: "Notifications",
      path: "/notifications",
    },
  ];

  return (
    <div className="lg:block hidden shadow-md bg-white fixed px-4 ml-16 rounded max-h-6xl py-8 shadow-lg">
      {icons.map((icon, index) => (
        <NavLink
          to={icon.path}
          key={index}
          className={`my-4 mt-8 p-1 mb-8 text-xl flex items-center cursor-pointer ${
            activeIndex === index
              ? " border-b-2 border-red-500"
              : "text-gray-600"
          }`}
          onClick={() => handleLinkClick(index)}
        >
          {icon.component}
          {/* <span className="ml-4">{icon.label}</span> */}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
