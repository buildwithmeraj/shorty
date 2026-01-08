import React from "react";
import { FaGear } from "react-icons/fa6";
import { FaExternalLinkSquareAlt, FaSyncAlt } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";

const HowItWorks = () => {
  return (
    <>
      {" "}
      <h2 className="text-center mt-6">How it Works</h2>
      <div className="py-6 max-w-7xl min-h-fit mx-auto justify-center justify-items-center items-center grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="hover-3d w-full min-h-72">
          <div className="bg-primary/10 p-6 rounded-lg relative">
            <span className="text-3xl font-bold">Step 1</span>
            <p className="">
              We generate a random short URL for each long URL you submit. We
              store the mapping between the short and long URLs in our database.
            </p>
            <FaGear
              className="absolute bottom-2 right-2 opacity-40 text-secondary"
              size={86}
            />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="hover-3d w-full min-h-72">
          <div className="bg-primary/10 p-6 rounded-lg relative">
            <span className="text-3xl font-bold">Step 2</span>
            <p className="">
              When someone clicks the short URL, we check if it exists in our
              database and redirect them to the original long URL. It happens
              instantly.
            </p>
            <FaExternalLinkSquareAlt
              className="absolute bottom-2 right-2 opacity-40 text-secondary"
              size={86}
            />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="hover-3d w-full min-h-72">
          <div className="bg-primary/10 p-6 rounded-lg relative">
            <span className="text-3xl font-bold">Step 3</span>
            <p className="">
              When user hits the short URL, we log the click and update the
              statistics for that link in our database. Only you can see them in
              your dashboard.
            </p>
            <FaSyncAlt
              className="absolute bottom-2 right-2 opacity-40 text-secondary"
              size={86}
            />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="hover-3d w-full min-h-72">
          <div className="bg-primary/10 p-6 rounded-lg relative">
            <span className="text-3xl font-bold">Step 4</span>
            <p className="">
              We organize the links in a dashboard where you can view and manage
              your links. We also provide analytics for each link. You can
              easily delete any link you no longer need.
            </p>
            <ImStatsDots
              className="absolute bottom-2 right-2 opacity-40 text-secondary"
              size={80}
            />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
