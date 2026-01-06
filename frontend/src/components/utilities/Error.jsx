import { MdError } from "react-icons/md";
import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div role="alert" className="alert alert-error alert-soft mt-2 w-full">
        <MdError size={18} />
        {message}
      </div>
    </div>
  );
};

export default Error;
