import React, { useState } from "react";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition duration-500 ease-in-out">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`min-w-full ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img src={slide.attributes.coverImage.large} alt="anime-cover" />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer left-2"
        onClick={goToPrevious}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer right-2"
        onClick={goToNext}
      >
        &#10095;
      </button>
      <div className="text-center mt-2">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={`inline-block w-2 h-2 my-0 mx-1 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-neutral-900" : "bg-gray-600"
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
