import React from "react";
import Icon from "./Icon";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 font-bold text-2xl">
      <Icon classes="w-10" />{" "}
      <div>
        <span className="text-[#39c9e3]">Short</span>
        <span className="text-[#eed338]">y</span>
      </div>
    </div>
  );
};

export default Logo;
