import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOn, setIsOn] = useState(false);
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const toggleSwitch = () => setIsOn(!isOn);
  return (
    <nav className='flex items-center bg-[url("/nav-footer-bg.png")] bg-no-repeat bg-cover bg-center'>
      <div className="flex items-center justify-between bg-black bg-opacity-70 px-[1.5vmax] py-[1.5vmin] w-full">
        <Link to="/" className="flex items-center gap-[1.5vmax]">
          <img
            src="/animexhub/logo.png"
            alt="AnimeXhuB"
            width={450}
            height={200}
            className="max-w-[5vmax]"
          />
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-[2vmax] font-bold tracking-wider text-[--primary]">
              AnimeXhuB
            </h3>
            <p className="text-[1.3vmax] font-medium text-neutral-200">
              アニメックスハブ
            </p>
          </div>
        </Link>
        <ul className="flex items-start gap-[4vmin]">
          <Link
            to="/trending"
            className="capitalize font-medium text-[1.3vmax] hover:text-[--primary] text-neutral-400"
          >
            trending
          </Link>
          <Link
            to="/characters"
            className="capitalize font-medium text-[1.3vmax] hover:text-[--primary] text-neutral-400"
          >
            characters
          </Link>
          <li className="capitalize font-medium text-[1.3vmax] relative group">
            <div className="group-hover:text-[--primary] flex flex-col items-center cursor-pointer text-neutral-400">
              <p>Anime</p>
              <FaChevronDown className="text-[0.8vmax]" />
            </div>
            <div className="absolute top-full -left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 hidden group-hover:flex delay-150 transition duration-300 ease-in-out border border-[--primary] px-[1vmax] py-[1vmin] rounded-lg rounded-tr-none shadow flex-col gap-[1.2vmin] bg-white bg-opacity-65 z-10">
              <Link
                to="/ongoing-anime"
                className="whitespace-nowrap hover:text-[--primary]"
              >
                ongoing anime
              </Link>
              <Link
                to="/completed-anime"
                className="whitespace-nowrap hover:text-[--primary]"
              >
                complete anime
              </Link>
              <Link
                to="/upcoming-anime"
                className="whitespace-nowrap hover:text-[--primary]"
              >
                upcoming anime
              </Link>
            </div>
          </li>
          <li className="capitalize font-medium text-[1.3vmax] relative group">
            <div className="group-hover:text-[--primary] flex flex-col items-center cursor-pointer text-neutral-400">
              <p>manga</p>
              <FaChevronDown className="text-[0.8vmax]" />
            </div>
            <div className="absolute top-full -left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 hidden group-hover:flex delay-150 transition duration-300 ease-in-out border border-[--primary] px-[1vmax] py-[1vmin] rounded-lg rounded-tr-none shadow flex-col gap-[1.2vmin] bg-white bg-opacity-65 z-10">
              <Link
                to="/ongoing-manga"
                className="whitespace-nowrap hover:text-[--primary]"
              >
                ongoing manga
              </Link>
              <Link
                to="/completed-manga"
                className="whitespace-nowrap hover:text-[--primary]"
              >
                complete manga
              </Link>
              <Link
                to="/upcoming-manga"
                className="whitespace-nowrap hover:text-[--primary]"
              >
                upcoming manga
              </Link>
            </div>
          </li>
        </ul>
        <div className="flex items-center border border-neutral-400 rounded-2xl px-[1vmax] py-[1vmin] gap-[2vmin] hover:bg-white focus-within:bg-white hover:bg-opacity-65 focus-within:bg-opacity-65 focus-within:border-0 group shadow-inner hover:border-0">
          <div className="flex items-center gap-2">
            <div
              className={`${
                isOn
                  ? "bg-[url('/anime-toggle.jpg')]"
                  : "bg-[url('/manga-toggle.jpg')]"
              } bg-no-repeat bg-cover rounded-full`}
            >
              <div
                className={`w-[4vmax] h-[4.5vmin] relative bg-white bg-opacity-15 flex items-center rounded-full p-2 cursor-pointer ${
                  isOn ? "justify-end" : "justify-start"
                }`}
                data-isOn={isOn}
                onClick={toggleSwitch}
              >
                <motion.div
                  className="w-[2vmin] h-[2vmin] bg-[linear-gradient(180deg,_rgba(249,_115,_22,_1)_0%,_rgba(253,_186,_116,_1)_50%,_rgba(249,_115,_22,_1)_100%)] rounded-full shadow-lg"
                  layout
                  transition={spring}
                />
              </div>
            </div>
          </div>
          <input
            type="search"
            placeholder={`Search your desire ${isOn ? "anime" : "manga"}`}
            className="placeholder:overflow-visible bg-transparent placeholder:text-neutral-600 group-hover:placeholder:text-neutral-700 group-focus-within:placeholder:text-neutral-700 group-hover:text-neutral-700 group-focus-within:text-neutral-700 focus:outline-none text-neutral-400"
          />
          <button
            type="button"
            className="text-[1.7vmax] text-neutral-400 group-hover:text-[--primary] group-focus-within:text-[--primary]"
          >
            <IoSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
