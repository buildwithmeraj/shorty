import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="px-[1%] md:px-[3%] lg:px-[5%]">
        <Outlet />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Root;
