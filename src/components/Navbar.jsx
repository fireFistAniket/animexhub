import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOn, setIsOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTopic, setSearchTopic] = useState("manga");
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isOn) {
      setSearchTopic("anime");
    } else {
      setSearchTopic("manga");
    }
  }, [isOn]);

  const handelSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value == "") {
      setSearchResults([]);
      return;
    }
    try {
      const req = await fetch(
        `${
          import.meta.env.VITE_API_URI
        }/${searchTopic}?filter[text]=${encodeURIComponent(
          searchQuery
        )}&page[limit]=5`
      );
      const data = await req.json();
      setSearchResults(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelForword = async (e) => {
    e.preventDefault();
    navigate(`/results?type=${searchTopic}&q=${searchQuery}`);
  };

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
        <ul className="hidden lg:flex items-start gap-[1.5vmin] 2xl:gap-[3vmin]">
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
          <Link
            to="/what-this-anime"
            className="capitalize font-medium text-[1.3vmax] hover:text-[--primary] text-neutral-400"
          >
            what this anime !
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
        <form
          className="hidden lg:flex items-center border border-neutral-400 rounded-2xl px-[1vmax] py-[1vmin] gap-[2vmin] hover:bg-white focus-within:bg-white hover:bg-opacity-65 focus-within:bg-opacity-65 focus-within:border-0 group shadow-inner hover:border-0 relative"
          onSubmit={handelForword}
        >
          <div className="flex items-center gap-2 relative">
            <div
              className={`${
                isOn
                  ? "bg-[url('/anime-toggle.jpg')]"
                  : "bg-[url('/manga-toggle.jpg')]"
              } bg-no-repeat bg-cover rounded-full`}
            >
              <div
                className={`w-[6vmax] h-[3.3vmin] relative bg-white bg-opacity-15 flex items-center rounded-full p-2 cursor-pointer ${
                  isOn ? "justify-end" : "justify-start"
                }`}
                dataison={isOn}
                onClick={toggleSwitch}
              >
                <motion.div
                  className="w-[1.7vmin] h-[1.7vmin] bg-[linear-gradient(180deg,_rgba(249,_115,_22,_1)_0%,_rgba(253,_186,_116,_1)_50%,_rgba(249,_115,_22,_1)_100%)] rounded-full shadow-lg"
                  layout
                  transition={spring}
                />
              </div>
            </div>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={handelSearch}
            placeholder={`Search your desire ${isOn ? "anime" : "manga"}`}
            className="placeholder:overflow-visible bg-transparent placeholder:text-neutral-600 group-hover:placeholder:text-neutral-700 group-focus-within:placeholder:text-neutral-700 group-hover:text-neutral-700 group-focus-within:text-neutral-700 focus:outline-none text-neutral-400 min-w-[17vmax]"
          />
          <button
            type="submit"
            className="text-[1.7vmax] text-neutral-400 group-hover:text-[--primary] group-focus-within:text-[--primary]"
          >
            <IoSearch />
          </button>
          {searchResults.length > 0 && (
            <div className="absolute top-full z-10 bg-white bg-opacity-20 backdrop-blur gap-[1.5vmin] py-[2vmin] px-[1vmin] flex flex-col w-full left-0 rounded-2xl">
              {searchResults?.map((anime) => (
                <Link
                  to={`/${anime.type}-details/${anime.id}`}
                  className="flex items-center gap-[1.4vmin] relative"
                  key={anime.id}
                  onClick={() => setSearchQuery("")}
                >
                  <img
                    src={anime.attributes.posterImage?.original}
                    alt="anime cover"
                    width={500}
                    height={500}
                    className="max-w-[3vmax] max-h-[3vmax] rounded-full object-cover"
                  />
                  <p className="text-[1.2vmax] font-bold text-neutral-100 line-clamp-1">
                    {anime.attributes.titles.en ||
                      anime.attributes.titles.en_jp ||
                      anime.attributes.titles.en_kr ||
                      anime.attributes.titles.en_cn ||
                      anime.attributes.titles.en_us}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </form>
        <div className="flex lg:hidden z-[1100]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isOpen ? "35vmax" : 0 }}
            className="bg-[linear-gradient(180deg,_rgba(249,_115,_22,_1)_0%,_rgba(253,_186,_116,_1)_50%,_rgba(249,_115,_22,_1)_100%)] text-white fixed top-0 right-0 h-full overflow-hidden"
          >
            <ul className="p-4">
              <li className="my-4">
                <Link
                  to="/trending"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  trending
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/characters"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  characters
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/what-this-anime"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  what this anime !
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/ongoing-anime"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  ongoing anime
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/completed-anime"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  complete anime
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/upcoming-anime"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  upcoming anime
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/ongoing-manga"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  ongoing manga
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/completed-manga"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  complete manga
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/upcoming-manga"
                  onClick={() => setIsOpen(false)}
                  className="capitalize font-medium text-[2vmax]"
                >
                  upcoming manga
                </Link>
              </li>
            </ul>
          </motion.div>
          <button
            onClick={toggleNav}
            className="px-[1.5vmin] py-[1vmin] bg-[#8f83b3] text-white rounded-md focus:outline-none"
          >
            <motion.div className="relative w-6 h-6 flex items-center justify-center">
              <svg width="23" height="23" viewBox="0 0 23 23">
                <motion.path
                  fill="transparent"
                  strokeWidth="3"
                  stroke="hsl(249, 60%, 20%)"
                  strokeLinecap="round"
                  initial={{ d: "M 2 2.5 L 20 2.5" }}
                  animate={{
                    d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5",
                  }}
                />
                <motion.path
                  fill="transparent"
                  strokeWidth="3"
                  stroke="hsl(249, 60%, 20%)"
                  strokeLinecap="round"
                  d="M 2 9.423 L 20 9.423"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.path
                  fill="transparent"
                  strokeWidth="3"
                  stroke="hsl(249, 60%, 20%)"
                  strokeLinecap="round"
                  initial={{ d: "M 2 16.346 L 20 16.346" }}
                  animate={{
                    d: isOpen
                      ? "M 3 2.5 L 17 16.346"
                      : "M 2 16.346 L 20 16.346",
                  }}
                />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
