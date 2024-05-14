import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='pr-[2vmax] flex items-center justify-between'>
      <Link
        to='/'
        className='bg-[url("/nav-footer-bg.png")] bg-no-repeat bg-cover bg-center'
      >
        <div className='flex items-center gap-[1.5vmax] bg-black bg-opacity-70 px-[1.5vmax] py-[1.5vmin]'>
          <img
            src='/animexhub/logo.png'
            alt='AnimeXhuB'
            width={450}
            height={200}
            className='max-w-[5vmax]'
          />
          <div className='flex flex-col items-center gap-1'>
            <h3 className='text-[2vmax] font-bold tracking-wider text-[--primary]'>
              AnimeXhuB
            </h3>
            <p className='text-[1.3vmax] font-medium text-neutral-200'>
              アニメックスハブ
            </p>
          </div>
        </div>
      </Link>
      <ul className='flex items-start gap-[4vmin]'>
        <li className='capitalize font-medium text-[1.3vmax] relative group'>
          <div className='group-hover:text-[--primary] flex flex-col items-center cursor-pointer'>
            <p>anime</p>
            <FaChevronDown />
          </div>
          <div className='absolute top-full -left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 hidden group-hover:flex delay-150 transition duration-300 ease-in-out border border-[--primary] px-[1vmax] py-[1vmin] rounded-lg rounded-tr-none shadow flex-col gap-[1.2vmin] bg-white bg-opacity-65'>
            <p className='whitespace-nowrap hover:text-[--primary]'>
              top anime
            </p>
            <p className='whitespace-nowrap hover:text-[--primary]'>
              recent anime
            </p>
          </div>
        </li>
        <li className='capitalize font-medium text-[1.3vmax] relative group'>
          <div className='group-hover:text-[--primary] flex flex-col items-center cursor-pointer'>
            <p>manga</p>
            <FaChevronDown />
          </div>
          <div className='absolute top-full -left-1/2 opacity-0 group-hover:opacity-100 hidden group-hover:flex delay-150 transition duration-300 ease-in-out border border-[--primary] px-[1vmax] py-[1vmin] rounded-lg rounded-tr-none shadow flex-col gap-[1.2vmin] bg-white bg-opacity-65'>
            <p className='whitespace-nowrap hover:text-[--primary]'>
              top manga
            </p>
            <p className='whitespace-nowrap hover:text-[--primary]'>
              recent manga
            </p>
          </div>
        </li>
        <li className='capitalize font-medium text-[1.3vmax] hover:text-[--primary]'>
          reviews
        </li>
      </ul>
      <div className='flex items-center border px-[1vmax] py-[1vmin] gap-[2vmin] '>
        <input
          type='search'
          placeholder='Search your desire anime'
          className='placeholder:overflow-visible bg-transparent placeholder:text-neutral-600'
        />
        <button type='button' className='text-[1.7vmax] text-neutral-600'>
          <IoSearch />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
