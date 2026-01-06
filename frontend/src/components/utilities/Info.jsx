import { FaInfoCircle } from "react-icons/fa";
import React from "react";

const Info = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div role="alert" className="alert alert-info alert-soft mt-2 w-full">
        <FaInfoCircle size={18} />
        {message}
      </div>
    </div>
  );
};

export default Info;
