import React from "react";
import Logo from "../utilities/Logo";
import NavLinks from "../utilities/NavLinks";
import NavEnd from "../utilities/NavEnd";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="drawer">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="navbar bg-base-100/70 backdrop-blur-lg shadow-sm fixed top-0 z-50 px-4">
          <div className="navbar-start">
            <label htmlFor="sidebar" className="lg:hidden">
              <FaBars size={20} className="mr-2 lg:hidden" />
            </label>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <NavLinks />
          </div>

          <div className="navbar-end">
            <NavEnd />
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li className="flex justify-center items-center -ml-4 mb-6">
            <Logo />
          </li>
          <li>
            <Link to="/">
              <IoHomeSharp className="mb-0.5" /> Home
            </Link>
          </li>
          <li>
            <Link to="/shorten">
              <FaGear />
              Shorten
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
