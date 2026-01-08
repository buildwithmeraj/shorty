import React from "react";
import { NavLink } from "react-router";

const NavLinks = () => {
  return (
    <ul className="items-center gap-4 hidden lg:flex">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/shorten">Shorten</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
