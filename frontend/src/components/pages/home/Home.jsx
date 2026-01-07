import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = `Home - ${import.meta.env.VITE_SITE_NAME}`;
  });
  return <div>Home</div>;
};

export default Home;
