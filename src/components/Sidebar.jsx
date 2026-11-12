import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdHistory, MdMenu, MdClose } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { useGlobalContext } from "../context/news_context";

const Sidebar = () => {
  const {isOpen, setIsOpen} = useGlobalContext();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <MdOutlineDashboard />,
    },
    {
      name: "Saved",
      path: "/saved",
      icon: <CiBookmark />,
    },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
      isActive
        ? "bg-[#2214b8] text-white shadow-lg shadow-[#2214b8]/20"
        : "text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700"
    }`;
    
  return (
    <>
      

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-dvh w-72 max-w-[85vw]
          bg-white dark:bg-gray-800 shadow-xl
          transform transition-transform duration-300 ease-in-out
          md:sticky md:top-4 md:z-0 md:h-fit md:w-1/4
          md:max-w-none md:rounded-xl md:shadow-lg
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-gray-700 md:hidden">
          <span className="font-bold text-lg text-slate-900 dark:text-white">
            Navigation
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>

        <nav className="p-4 md:p-6 lg:p-8">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setIsOpen(false)}
                  className={linkClass}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}

          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar