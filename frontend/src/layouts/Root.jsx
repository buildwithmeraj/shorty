import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/shared/Footer";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-20 px-[1%] md:px-[3%] lg:px-[5%]">
        <Outlet />
      </main>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </div>
  );
};

export default Root;
