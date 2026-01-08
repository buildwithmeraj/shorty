import React, { useState } from "react";
import Slider from "./Slider";
import Logo from "../../utilities/Logo";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const titles = ["Create", "Control", "Analyze"];
  const classes = [
    "bg-success text-white px-1 rounded",
    "bg-error text-white px-1 rounded",
    "bg-info text-white px-1 rounded",
  ];
  const texts = [
    "Create shortened links effortlessly with our intuitive interface in a few clicks. Just paste your long URL and get a shortened one instantly.",
    "Take control of your links. You can remove a link at any time. Visit the dashboard to manage your links.",
    "Analyze link performance with detailed statistics and insights. Track clicks and user engagement to optimize your link strategy. ",
  ];

  return (
    <div className="max-w-7xl bg-base-200 min-h-fit mx-auto flex items-center rounded-xl flex-col lg:flex-row gap-1">
      <div className="lg:w-1/2 flex items-center flex-col justify-center">
        <h2 className="mt-8">
          Welcome to <Logo classes={`text-3xl py-2`} />
        </h2>
        <div className="text-center py-8 space-y-4">
          <h3 className="text-2xl font-bold">
            You can{" "}
            <span className={classes[activeSlide]}>{titles[activeSlide]}</span>
          </h3>
          <p className="leading-relaxed px-1 lg:px-8">{texts[activeSlide]}</p>
        </div>
      </div>
      <div className="lg:w-1/2 py-2">
        <Slider onSlideChange={setActiveSlide} />
      </div>
    </div>
  );
};

export default Hero;
