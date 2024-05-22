import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

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

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const Carousel = ({ slides }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const currentIndex = ((page % slides.length) + slides.length) % slides.length;

  return (
    <div className='relative w-full overflow-hidden h-[70vh]'>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className='w-full h-full flex items-center justify-center'
        >
          <img
            src={
              slides[currentIndex]?.attributes?.coverImage.original ||
              slides[currentIndex]?.attributes?.coverImage.large
            }
            alt='anime-cover'
            className='w-full h-full object-cover'
          />
        </motion.div>
      </AnimatePresence>
      <button
        className='absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer left-2'
        onClick={() => paginate(-1)}
      >
        &#10094;
      </button>
      <button
        className='absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer right-2'
        onClick={() => paginate(1)}
      >
        &#10095;
      </button>
      <div className='text-center mt-2 relative'>
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

export default Carousel;
