import React, { useEffect } from "react";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import CTA from "./CTA";
import Example from "./Example";

const Home = () => {
  useEffect(() => {
    document.title = `Home - ${import.meta.env.VITE_SITE_NAME}`;
  });
  return (
    <>
      <Hero />
      <HowItWorks />
      <Example />
      <CTA />
    </>
  );
};

export default Home;
