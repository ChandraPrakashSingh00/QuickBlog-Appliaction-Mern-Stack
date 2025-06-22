import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img src={assets.logo} alt="Logo" className="w-28 sm:w-36" />
        </div>

        {/* Desktop Button */}
        <div className="hidden sm:flex">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 rounded-full text-sm bg-primary text-white px-6 py-2 hover:bg-primary/90 transition"
          >
            {token ? 'Dashboard' : 'Login'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white px-6 pb-4 transition-all">
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate('/admin');
            }}
            className="w-full flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded-full"
          >
            {token ? 'Dashboard' : 'Login'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
