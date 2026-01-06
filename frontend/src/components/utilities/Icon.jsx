import React from "react";
import siteIcon from "../../assets/images/icon.png";
const Icon = ({ classes }) => {
  return (
    <>
      <img src={siteIcon} alt="Site Icon" className={classes} />
    </>
  );
};

export default Icon;
