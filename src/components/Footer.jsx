import React from "react";
import { FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-[url("/nav-footer-bg.png")] bg-no-repeat bg-cover bg-center'>
      <div className="bg-black bg-opacity-75 flex justify-between pr-[2vmax]">
        <div className="px-[1.5vmax] py-[5vmin] flex flex-col items-start gap-[1.5vmax]">
          <div className="flex items-center gap-[2vmax]">
            <Link to="/" className="flex items-center gap-[1.5vmax]">
              <img
                src="/animexhub/logo.png"
                alt="AnimeXhuB"
                width={450}
                height={200}
                className="max-w-[4vmax]"
              />
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-[1.6vmax] font-bold tracking-wider text-[--primary]">
                  AnimeXhuB
                </h3>
                <p className="text-[1vmax] font-medium text-neutral-200">
                  アニメックスハブ
                </p>
              </div>
            </Link>
            <ul className="flex items-center gap-[4vmin]">
              <Link
                to="/ongoing-anime"
                className="capitalize font-medium text-[1.3vmax] relative cursor-pointer hover:text-[--primary] text-neutral-400"
              >
                anime
              </Link>
              <Link
                to="/ongoing-manga"
                className="capitalize font-medium text-[1.3vmax] relative hover:text-[--primary] text-neutral-400 cursor-pointer"
              >
                manga
              </Link>
              <Link
                to="/characters"
                className="capitalize font-medium text-[1.3vmax] hover:text-[--primary] text-neutral-400 cursor-pointer"
              >
                characters
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-[1vmin]">
            <p className="text-neutral-400 text-[1.3vmax] font-medium">
              Copyright &copy; 2024 AnimeXhuB. All rights reserved.
            </p>
            <div className="flex items-center gap-[0.5vmax] text-neutral-400 text-[1.3vmax] capitalize">
              <Link to="/privacy-policy" className="hover:text-[--primary]">
                privacy policy
              </Link>
              <p>|</p>
              <Link to="/terms-of-use" className="hover:text-[--primary]">
                terms of use
              </Link>
              <p>|</p>
              <Link to="/what-this-anime" className="hover:text-[--primary]">
                what this anime !
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center">
          <Link
            to="https://www.instagram.com/code_n_creativity?igsh=MWRzcWVyMmIxMnIyZw%3D%3D&utm_source=qr"
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-[2.5vmax] h-full flex items-center justify-center px-[2vmin] border-l border-r hover:border-l-0 hover:border-r-0 hover:bg-[radial-gradient(circle_at_30%_107%,_#fdf497_0%,_#fdf497_5%,_#fd5949_45%,_#d6249f_60%,_#285AEB_90%)] text-neutral-400 hover:text-neutral-100"
          >
            <FiInstagram />
          </Link>
          <Link
            to="https://pin.it/1BlLf76p2"
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-[2.5vmax] h-full flex items-center justify-center px-[2vmin] border-l border-r hover:border-l-0 hover:border-r-0 hover:bg-red-600 text-neutral-400 hover:text-neutral-100 transition duration-500 ease-in-out"
          >
            <FaPinterest />
          </Link>
          <Link
            to="https://www.linkedin.com/in/code-n-creativity-189087307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-[2.5vmax] h-full flex items-center justify-center px-[2vmin] border-l border-r hover:border-l-0 hover:border-r-0 hover:bg-blue-600 text-neutral-400 hover:text-neutral-100 transition duration-500 ease-in-out"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            to="/"
            className="text-[2.5vmax] h-full flex items-center justify-center px-[2vmin] border-l border-r hover:border-l-0 hover:border-r-0 hover:bg-green-600 text-neutral-400 hover:text-neutral-100 transition duration-500 ease-in-out"
          >
            <FaUpwork />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
