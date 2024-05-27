import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
  }),
};

const StaticCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const slides = [
    "/animexhub/static-carousel-img-1.jpg",
    "/animexhub/static-carousel-img-2.jpg",
    "/animexhub/static-carousel-img-3.jpg",
  ];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const currentIndex = ((page % slides.length) + slides.length) % slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative min-h-[45vh] md:min-h-[65vh] xl:min-h-[85vh]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 50 },
            }}
            className="w-full absolute h-full flex items-center justify-center"
          >
            <img
              src={slides[currentIndex]}
              alt="anime-cover"
              className="w-full max-h-[85vh] h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <button
          className="absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer left-2 z-10 text-[2.5vmax]"
          onClick={() => paginate(-1)}
        >
          <FaAngleLeft />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer right-2 z-10 text-[2.5vmax]"
          onClick={() => paginate(1)}
        >
          <FaAngleRight />
        </button>
      </div>
      <div className="text-center mt-2 relative">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={`inline-block w-2 h-2 my-0 mx-1 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-neutral-900" : "bg-gray-600"
            }`}
            onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default StaticCarousel;
