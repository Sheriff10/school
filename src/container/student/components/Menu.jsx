import React, { useState } from "react";
import { FaBars, FaHome, FaSearch, FaCalendarAlt, FaChalkboard, FaEnvelope, FaClipboardList, FaChartBar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function StudentMenu({ children }) {
   const dum = [1, 2, 3, 4, 5, 3, 3];
   const menuFunc = (icon, text, link) => {
      return { icon, text, link };
   };

   const menuArr = [
      menuFunc(<FaHome />, "Dashboard", "/student/dashboard"),
      menuFunc(<FaCalendarAlt />, "Calendar", "/student/calendar"),
      menuFunc(<FaChalkboard />, "Classes", "/student/class"),
      menuFunc(<FaEnvelope />, "Message", "/student/message"),
      menuFunc(<FaClipboardList />, "Assignments", "/student/assignments"),
      menuFunc(<FaChartBar />, "Grades", "/student/grades"),
    ];
   const [show, setShow] = useState(true);
   return (
      <div className="menu bg-grey">
         <div className="flex">
            <div
               className={`side-menu lg:w-[300px] h-[100vh] bg-white relative ${
                  !show && "d-none"
               }`}
            >
               <div className="wrap bg-white z-10  fixed top-0 bottom-0 w-[80%] lg:w-[250px]">
                  <div className="logo-con text-2xl font-bold text-center py-4">
                     <span>Harmony Success School</span>
                  </div>
                  <div className="menu-con px-2">
                     <div className="label text-sm font-bold pt-2 text-gray-500">
                        <span>Main Menu</span>
                     </div>
                     <div className="menu-list mt-3">
                        <ul>
                           {menuArr.map((menu, index) => (
                              <li key={index} className="flex">
                                 <NavLink
                                    to={menu.link}
                                    className="flex mb-4 p-0 w-full"
                                 >
                                    <li
                                       className={` text-gray-500 px-2 hover:bg-slate-300 hover:rounded-lg hover:text-primary w-full`}
                                    >
                                       {" "}
                                       <a
                                          className={`d-flex gap-2 align-items-center  py-2 px-3 rounded-lg`}
                                       >
                                          {menu.icon} {menu.text}
                                       </a>
                                    </li>
                                 </NavLink>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            {/* Content Section */}
            <div className="content w-100 min-h-[100vh]">
               <div className="header bg-white py-2">
                  <div className="flex lg:flex-row-reverse container justify-between items-center">
                     {/* User Img */}
                     <div className="profile">
                        <div className="flex items-center">
                           <div className="img-wrap">
                              <img
                                 src="/avatar.jpeg"
                                 alt="Profile"
                                 className="w-[30px] h-[30px] rounded-full border-pri border-3"
                              />
                           </div>
                           <div className="text-wrap px-3">
                              <span className="font-bold">Raynold Taylor</span>{" "}
                              <br />
                              <span className="text-sm text-pri">Admin</span>
                           </div>
                        </div>
                     </div>

                     {/* search bar */}
                     <div className="search-bar hidden md:block">
                        <div className="wrap flex gap-2 items-center bg-grey px-3 rounded-lg">
                           <FaSearch className="text-2xl" />{" "}
                           <input
                              type="text"
                              className="border-0 px-3  py-2 w-full bg-grey"
                              placeholder="Search"
                           />
                        </div>
                     </div>

                     <div
                        className="menu-bar bg-pri p-2 rounded-lg"
                        onClick={() => setShow(!show)}
                     >
                        <span className=" text-white">
                           <FaBars />{" "}
                        </span>
                     </div>
                  </div>
               </div>

               {/* Page Content */}
               <div className="w-100">{children}</div>
            </div>
         </div>
      </div>
   );
}
