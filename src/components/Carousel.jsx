import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
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

const Carousel = ({ slides }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const currentIndex = ((page % slides.length) + slides.length) % slides.length;

  return (
    <div className='w-full overflow-hidden'>
      <div className='relative min-h-[80vh]'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: "spring", stiffness: 300, damping: 50 },
            }}
            className='w-full absolute h-full flex items-center justify-center'
          >
            <img
              src={
                slides[currentIndex]?.attributes?.coverImage?.original ||
                slides[currentIndex]?.attributes?.coverImage?.large
              }
              alt='anime-cover'
              className='w-full max-h-[80vh] h-full object-cover'
            />
            <div className='absolute w-full bottom-0 bg-black bg-opacity-30 px-[3vmax] py-[1vmin] backdrop-blur flex flex-col items-start gap-[1.2vmin]'>
              <div className='flex items-center gap-[3vmin]'>
                <h1 className='text-[2.5vmax] font-bold text-neutral-100'>
                  {slides[currentIndex]?.attributes?.titles.en ||
                    slides[currentIndex]?.attributes?.titles.en_jp}
                </h1>
                <p className='bg-white rounded-md text-[1.2vmax] font-semibold px-[2vmin] py-[0.5vmin] shadow shadow-neutral-600'>
                  {slides[currentIndex]?.attributes?.ageRating}
                </p>
              </div>
              <p className='text-[1.5vmax] flex items-center gap-2 font-medium text-neutral-100'>
                Rating:{" "}
                {Math.round(
                  parseInt(slides[currentIndex]?.attributes?.averageRating) / 10
                )}
                <FaStar color='#fece3c' />
              </p>
              <p className='text-[1.5vmax] flex items-center gap-2 font-medium text-neutral-100'>
                Episodes {slides[currentIndex]?.attributes?.episodeCount}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          className='absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer left-2 z-10 text-[2.5vmax]'
          onClick={() => paginate(-1)}
        >
          <FaAngleLeft />
        </button>
        <button
          className='absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 cursor-pointer right-2 z-10 text-[2.5vmax]'
          onClick={() => paginate(1)}
        >
          <FaAngleRight />
        </button>
      </div>
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
