import React, { useState, useRef, useEffect } from "react";

const Slider = ({ onSlideChange }) => {
  const [mainSwiper, setMainSwiper] = useState(null);
  const mainSwiperRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "/create.png",
    },
    {
      id: 2,
      image: "/control.png",
    },
    {
      id: 3,
      image: "/stats.png",
    },
  ];

  useEffect(() => {
    const loadSwiper = async () => {
      const Swiper = (
        await import(
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs"
        )
      ).default;

      // Initialize main swiper with cube effect
      const main = new Swiper(mainSwiperRef.current, {
        effect: "cube",
        grabCursor: true,
        loop: true,
        speed: 800,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        cubeEffect: {
          shadow: false,
          slideShadows: false,
        },
        on: {
          slideChange: function () {
            const index = this.realIndex;
            // Notify parent component about slide change
            if (onSlideChange) {
              onSlideChange(index);
            }
          },
        },
      });

      setMainSwiper(main);
    };

    loadSwiper();

    return () => {
      if (mainSwiper) mainSwiper.destroy();
    };
  }, [onSlideChange]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />
      <div
        ref={mainSwiperRef}
        className="swiper main-swiper w-full max-w-2xl mx-auto"
      >
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div key={slide.id} className="swiper-slide">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .main-swiper .swiper-slide {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default Slider;
