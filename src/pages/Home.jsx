import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "../components/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topAirAnime, setTopAirAnime] = useState([]);
  const [topAirManga, setTopAirManga] = useState([]);
  const {
    data: topAirAnimeData,
    loading: topAirAnimeLoading,
    error: topAirAnimeError,
  } = useFetch("/recommendations/anime");

  const {
    data: topAirMangaData,
    loading: topAirMangaLoading,
    error: topAirMangaError,
  } = useFetch("/recommendations/manga");

  const animeScrollContainer = useRef(null);
  const mangaScrollContainer = useRef(null);

  const animeScrollLeft = () => {
    if (animeScrollContainer.current) {
      animeScrollContainer.current.scrollLeft -= 250; // Adjust the scroll amount as needed
    }
  };

  const animeScrollRight = () => {
    if (animeScrollContainer.current) {
      animeScrollContainer.current.scrollLeft += 250; // Adjust the scroll amount as needed
    }
  };

  const mangaScrollLeft = () => {
    if (mangaScrollContainer.current) {
      mangaScrollContainer.current.scrollLeft -= 250; // Adjust the scroll amount as needed
    }
  };

  const mangaScrollRight = () => {
    if (mangaScrollContainer.current) {
      mangaScrollContainer.current.scrollLeft += 250; // Adjust the scroll amount as needed
    }
  };

  useEffect(() => {
    if (topAirAnimeLoading && topAirMangaLoading) {
      setIsLoading(true);
    } else {
      setTopAirAnime(topAirAnimeData);
      setTopAirManga(topAirMangaData);
      setIsLoading(false);
    }
  }, [topAirAnimeLoading, topAirMangaLoading]);

  return (
    <main className="flex flex-col justify-center gap-[4vmax]">
      <div className="bg-[url('/hero-header-bg.png')] bg-no-repeat bg-cover bg-center min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-[4vmin] max-w-[60vmax] bg-white bg-opacity-40 px-[2vmax] py-[2vmin] backdrop-blur-sm rounded-lg shadow">
          <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
            Hi, Welcome to <span className="font-bold">AnimeXhuB</span>
          </h1>
          <p className="text-center text-[1.8vmax] font-medium text-neutral-900">
            AnimeXhuB welcomes visitors with stunning anime imagery, offering a
            captivating glimpse into the world of anime. Featuring vibrant
            colors and dynamic designs, it sets the stage for an immersive anime
            experience.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mx-[3vmax] my-[3vmin] gap-[4vmin]">
        <div className="flex flex-col items-center gap-[4vmin] max-w-[55vmax]">
          <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
            What is <span className="font-bold">AnimeXhub</span>?
          </h1>
          <p className="text-center text-[1.8vmax] font-medium text-neutral-900">
            AnimeXhuB is a passionate community-driven platform dedicated to all
            things anime. Our mission is to celebrate the artistry,
            storytelling, and culture of anime, bringing fans together to
            discover, share, and connect. With a deep love for anime and a
            commitment to excellence, we strive to provide a vibrant and
            inclusive space for anime enthusiasts worldwide. Join us on a
            journey to explore the endless wonders of the anime universe!
          </p>
        </div>
        <img
          src="/animexhub/about-us-cover.jpg"
          alt="about us"
          className="max-h-[80vmin] shadow-xl rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-[4vmin] mx-[3vmax] my-[3vmin]">
        <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
          List of some top Airing animes till dates
        </h1>
        <div className="relative group">
          <div
            className="flex items-center gap-[2vmax] overflow-hidden no-scrollbar overflow-x-scroll max-w-[45vmax] sm:max-w-[65vmax] lg:max-w-[85vmax] scroll-smooth"
            ref={animeScrollContainer}
          >
            {isLoading ? (
              <Loader />
            ) : (
              topAirAnime?.data?.slice(0, 10).map((item) =>
                item.entry.map((animes) => (
                  <div
                    className="flex items-stretch relative flex-shrink flex-grow basis-[15vmax] min-w-[15vmax]"
                    key={animes.id}
                  >
                    <img
                      src={
                        animes.images.jpg.large_image_url ||
                        animes.images.jpg.image_url
                      }
                      alt="anime cover"
                      width={500}
                      height={500}
                      className="w-full h-auto inline-block rounded-lg"
                    />
                    <p className="text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full">
                      {animes.title}
                    </p>
                  </div>
                ))
              )
            )}
          </div>
          <button
            onClick={animeScrollLeft}
            className="text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 left-0 hidden md:group-hover:inline-block rounded-lg"
            type="button"
          >
            <FaChevronLeft className="opacity-60 hover:opacity-100" />
          </button>
          <button
            onClick={animeScrollRight}
            className="text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 right-0 hidden md:group-hover:inline-block rounded-lg"
            type="button"
          >
            <FaChevronRight className="opacity-60 hover:opacity-100" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[4vmin] my-[3vmin] mx-[3vmax]">
        <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
          What can you expect from us!
        </h1>
        <div className="flex flex-col items-center gap-[4vmin]">
          <div className="flex items-center">
            <p className="text-center text-[1.8vmax] font-medium text-neutral-900 max-w-[55vmax]">
              Immerse yourself in the captivating world of anime with AnimeXhuB.
              Explore a vast collection of anime series, movies, and OVA
              episodes. From timeless classics to the latest releases, AnimeXhuB
              is your gateway to endless anime entertainment.
            </p>
            <img
              src="/animexhub/what-can-you-expect-cover1.jpg"
              alt="what-can-you-expect-cover"
              className="max-h-[70vmin] shadow-xl rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <img
              src="/animexhub/what-can-you-expect-cover2.jpg"
              alt="what-can-you-expect-cover"
              className="max-h-[70vmin] shadow-xl rounded-lg"
            />
            <p className="text-center text-[1.8vmax] font-medium text-neutral-900 max-w-[55vmax]">
              Step into the exciting realm of manga with AnimeXhuB. Discover a
              treasure trove of manga titles, from beloved classics to the
              hottest new releases. Dive into captivating stories, vibrant
              artwork, and rich storytelling that will keep you hooked for
              hours.
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-center text-[1.8vmax] font-medium text-neutral-900 max-w-[55vmax]">
              Join a thriving community of anime and manga enthusiasts on
              AnimeXhuB. Share your passion, discuss your favorite series, and
              connect with like-minded fans from around the world. Stay updated
              on the latest news, trends, and discussions in the anime and manga
              community.
            </p>
            <img
              src="/animexhub/what-can-you-expect-cover3.jpg"
              alt="what-can-you-expect-cover"
              className="max-h-[70vmin] shadow-xl rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[4vmin] mx-[3vmax] my-[3vmin]">
        <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
          List of some top Airing mangas till dates
        </h1>
        <div className="relative group">
          <div
            className="flex items-center gap-[2vmax] overflow-hidden no-scrollbar overflow-x-scroll max-w-[45vmax] sm:max-w-[65vmax] lg:max-w-[85vmax] scroll-smooth"
            ref={mangaScrollContainer}
          >
            {isLoading ? (
              <Loader />
            ) : (
              topAirManga?.data?.slice(0, 10).map((item) =>
                item.entry.map((animes) => (
                  <div
                    className="flex items-stretch relative flex-shrink flex-grow basis-[15vmax] min-w-[15vmax]"
                    key={animes.id}
                  >
                    <img
                      src={
                        animes.images.jpg.large_image_url ||
                        animes.images.jpg.image_url
                      }
                      alt="anime cover"
                      width={500}
                      height={500}
                      className="w-full h-auto inline-block rounded-lg"
                    />
                    <p className="text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full">
                      {animes.title}
                    </p>
                  </div>
                ))
              )
            )}
          </div>
          <button
            onClick={mangaScrollLeft}
            className="text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 left-0 hidden md:group-hover:inline-block rounded-lg"
            type="button"
          >
            <FaChevronLeft className="opacity-60 hover:opacity-100" />
          </button>
          <button
            onClick={mangaScrollRight}
            className="text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 right-0 hidden md:group-hover:inline-block rounded-lg"
            type="button"
          >
            <FaChevronRight className="opacity-60 hover:opacity-100" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
