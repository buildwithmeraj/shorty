import React from "react";
import { NavLink } from "react-router";

const NavLinks = () => {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/create">Shorten</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
