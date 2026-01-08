import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4 mt-6 py-6">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <span className="font-semibold">Shorty</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
