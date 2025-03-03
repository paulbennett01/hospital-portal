import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  return (
    <header className="navbar">
      <div className="navbar2">
        {/* Navigation Menu */}
        <div
          id="collapseMenu"
          className={`${
            menuOpen ? "max-lg:block" : "max-lg:hidden"
          } lg:!block max-lg:fixed max-lg:bg-black max-lg:opacity-50 max-lg:inset-0 max-lg:z-50`}
        >
          {/* Close Button */}
          <button
            id="toggleClose"
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          {/* Menu Links */}
          <ul className="menu-list flex gap-5 lg:flex-row flex-col w-full text-center">
          {isLoggedIn ? (
              <>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link to="/dashboard" className="link">Dashboard</Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link to="/slideshow" className="link">Get to Know the Hospital</Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link to="/games" className="link">Games</Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link to="/videos" className="link">Videos</Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <button
                    onClick={() => {
                      handleLogout();
                      navigate("/login");
                    }}
                    className="link"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link to="/login" className="link">Login</Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link to="/register" className="link">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Open Menu Button */}
        <div className="flex max-lg:ml-auto">
          <button id="toggleOpen" onClick={() => setMenuOpen(true)} className="lg:hidden">
            <svg className="w-7 h-7" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
