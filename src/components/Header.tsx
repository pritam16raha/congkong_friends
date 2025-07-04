import React from 'react';

type HeaderProps = {
  onMenuClick: () => void;
};

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center mb-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-200"
        aria-label="Open sidebar"
      >
        <MenuIcon />
      </button>
      <h1 className="text-2xl font-bold text-gray-800">
        REAL-TIME KPI DASHBOARD
      </h1>
    </header>
  );
};

export default Header;