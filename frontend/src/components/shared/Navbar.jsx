import React from "react";
import Logo from "../utilities/Logo";
import NavLinks from "../utilities/NavLinks";
import NavEnd from "../utilities/NavEnd";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 bg-base-100 border-b border-base-300 shadow-sm fixed top-0 w-full px-[1%] md:px-[3%] lg:px-[5%]">
      <Link to="/">
        <Logo />
      </Link>
      <NavLinks />
      <NavEnd />
    </div>
  );
};

export default Navbar;
