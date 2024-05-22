import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <li className="capitalize font-medium text-[1.3vmax] hover:text-[--primary] text-neutral-400">
            anime
          </li>
          <li className="capitalize font-medium text-[1.3vmax] hover:text-[--primary] text-neutral-400">
            manga
          </li>
          <li className="capitalize font-medium text-[1.3vmax] relative group">
            <div className="group-hover:text-[--primary] flex flex-col items-center cursor-pointer text-neutral-400">
              <p>trending</p>
              <FaChevronDown className="text-[0.8vmax]" />
            </div>
            <div className="absolute top-full -left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 hidden group-hover:flex delay-150 transition duration-300 ease-in-out border border-[--primary] px-[1vmax] py-[1vmin] rounded-lg rounded-tr-none shadow flex-col gap-[1.2vmin] bg-white bg-opacity-65 z-10">
              <Link
                to="/trending-anime"
                className="whitespace-nowrap hover:text-[--primary]"
              >
                trending anime
              </Link>
              <p className="whitespace-nowrap hover:text-[--primary]">
                trending manga
              </p>
            </div>
          </li>
        </ul>
        <div className="flex items-center border border-neutral-400 rounded-2xl px-[1vmax] py-[1vmin] gap-[2vmin] hover:bg-white focus-within:bg-white hover:bg-opacity-65 focus-within:bg-opacity-65 focus-within:border-0 group shadow-inner hover:border-0">
          <input
            type="search"
            placeholder="Search your desire anime"
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
