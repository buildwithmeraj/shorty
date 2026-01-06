import { FaCheckCircle } from "react-icons/fa";
import React from "react";

const Success = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div role="alert" className="alert alert-success alert-soft mt-2 w-full">
        <FaCheckCircle size={18} />
        {message}
      </div>
    </div>
  );
};

export default Success;
