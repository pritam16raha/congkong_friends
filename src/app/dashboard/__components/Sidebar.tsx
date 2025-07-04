"use client";

import React from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    ></path>
  </svg>
);
const TrackerIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ></path>
  </svg>
);
const ReportsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"
    ></path>
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems: NavItem[] = [
    { href: "#", label: "Event Management", icon: <DashboardIcon /> },
    {
      href: "#",
      label: "Real-Time Dashboard",
      icon: <DashboardIcon />,
      active: true,
    },
    { href: "#", label: "Matching Tracker", icon: <TrackerIcon /> },
    { href: "#", label: "Meeting Monitoring", icon: <TrackerIcon /> },
    { href: "#", label: "Participant Management", icon: <TrackerIcon /> },
    { href: "#", label: "Reports", icon: <ReportsIcon /> },
    { href: "#", label: "AI Matching Settings", icon: <ReportsIcon /> },
  ];

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">CONGKONG</h1>
      </div>
      <nav className="flex-1 p-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`flex items-center p-2 my-1 rounded-md text-sm transition-colors ${
                  item.active
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">{/* Admin profile */}</div>
    </>
  );

  return (
    <>
      <aside className="w-64 bg-gray-800 text-white flex-col hidden lg:flex">
        {sidebarContent}
      </aside>
      <div
        className={`fixed inset-0 bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
