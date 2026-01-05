import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

const Root = () => {
  return (
    <div className="px-[5%]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
