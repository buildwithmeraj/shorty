import { MdWarning } from "react-icons/md";
import React from "react";

const Warning = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div role="alert" className="alert alert-warning alert-soft mt-2 w-full">
        <MdWarning size={18} />
        {message}
      </div>
    </div>
  );
};

export default Warning;
