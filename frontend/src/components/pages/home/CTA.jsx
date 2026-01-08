import React from "react";
import { FaGear } from "react-icons/fa6";

const CTA = () => {
  return (
    <div className="max-w-7xl bg-primary/10 min-h-fit mx-auto flex items-center rounded-xl flex-col gap-1 p-6 mt-4 backdrop-blur-sm">
      <div className="lg:w-3/4 flex items-center flex-col justify-center text-center">
        <h2 className="mt-2 text-2xl font-bold">Ready to get started?</h2>
        <p className="leading-relaxed px-1 lg:px-8 py-4">
          Join thousands of users who trust Shorty for their URL shortening
          needs. Create your first short link today and experience the
          convenience and efficiency of our platform.
        </p>
      </div>
      <div className="lg:w-1/4 flex items-center justify-center">
        <a href="/shorten" className="btn btn-primary">
          <FaGear />
          Get Started
        </a>
      </div>
    </div>
  );
};

export default CTA;
