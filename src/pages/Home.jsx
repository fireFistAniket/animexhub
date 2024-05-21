import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topTrendingAnime, setTopTrendingAnime] = useState([]);
  const [topTrendingManga, setTopTrendingManga] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isInView, setIsInView] = useState({
    aboutus: false,
    expect1: false,
    expect2: false,
    expect3: false,
    whyUs: false,
  });

  const {
    data: topTrendingAnimeData,
    loading: topTrendingAnimeLoading,
    error: topTrendingAnimeError,
  } = useFetch("/trending/anime");

  const {
    data: topTrendingMangaData,
    loading: topTrendingMangaLoading,
    error: topTrendingMangaError,
  } = useFetch("/trending/manga");

  const {
    data: reactionData,
    loading: reactionLoading,
    error: reactionError,
  } = useFetch("/media-reactions?include=user,anime,manga");

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch("/categories?page[limit]=30&sort=-totalMediaCount");

  const animeScrollContainer = useRef(null);
  const mangaScrollContainer = useRef(null);
  const reactionScrollContainer = useRef(null);

  const scrollLeft = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 250;
    }
  };

  const scrollRight = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 250;
    }
  };

  useEffect(() => {
    if (
      topTrendingAnimeLoading &&
      topTrendingMangaLoading &&
      reactionLoading &&
      categoryLoading
    ) {
      setIsLoading(true);
    } else {
      setTopTrendingAnime(topTrendingAnimeData);
      setTopTrendingManga(topTrendingMangaData);
      setReactions(reactionData);
      setCategories(categoryData);
      setIsLoading(false);
    }
  }, [
    topTrendingAnimeLoading,
    topTrendingMangaLoading,
    reactionLoading,
    categoryLoading,
  ]);

  return (
    <main className='flex flex-col justify-center gap-[4vmax]'>
      <div className="bg-[url('/hero-header-bg.png')] bg-no-repeat bg-cover bg-center min-h-[80vh] flex items-center justify-center">
        <motion.div
          className='flex flex-col items-center gap-[4vmin] max-w-[60vmax] bg-white bg-opacity-40 px-[2vmax] py-[2vmin] backdrop-blur-sm rounded-lg shadow'
          initial={{ scale: 0.2 }}
          transition={{ duration: 1 }}
          whileInView={{ scale: 1 }}
        >
          <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
            Hi, Welcome to <span className='font-bold'>AnimeXhuB</span>
          </h1>
          <p className='text-center text-[1.8vmax] font-medium text-neutral-900'>
            AnimeXhuB welcomes visitors with stunning anime imagery, offering a
            captivating glimpse into the world of anime. Featuring vibrant
            colors and dynamic designs, it sets the stage for an immersive anime
            experience.
          </p>
        </motion.div>
      </div>
      <div className='flex items-center justify-center mx-[3vmax] my-[3vmin] gap-[4vmin]'>
        <div className='flex flex-col items-center gap-[4vmin] max-w-[55vmax]'>
          <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
            What is <span className='font-bold'>AnimeXhub</span>?
          </h1>
          <p className='text-center text-[1.8vmax] font-medium text-neutral-900'>
            AnimeXhuB is a passionate community-driven platform dedicated to all
            things anime. Our mission is to celebrate the artistry,
            storytelling, and culture of anime, bringing fans together to
            discover, share, and connect. With a deep love for anime and a
            commitment to excellence, we strive to provide a vibrant and
            inclusive space for anime enthusiasts worldwide. Join us on a
            journey to explore the endless wonders of the anime universe!
          </p>
        </div>
        <motion.div
          initial={false}
          animate={
            isInView.aboutus
              ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
              : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
          }
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() =>
            setIsInView((prev) => ({ ...prev, aboutus: true }))
          }
        >
          <img
            src='/animexhub/about-us-cover.jpg'
            alt='about us'
            className='max-h-[80vmin] shadow-xl rounded-lg'
          />
        </motion.div>
      </div>
      <div className='flex flex-col items-center gap-[4vmin] mx-[3vmax] my-[3vmin]'>
        <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
          List of some top Trending animes till dates
        </h1>
        <div className='relative group'>
          <div
            className='flex items-center gap-[2vmax] overflow-hidden no-scrollbar overflow-x-scroll max-w-[45vmax] sm:max-w-[65vmax] lg:max-w-[85vmax] scroll-smooth'
            ref={animeScrollContainer}
          >
            {isLoading ? (
              <Loader />
            ) : (
              topTrendingAnime?.data?.slice(0, 10).map((animes) => (
                <div
                  className='flex items-stretch relative flex-shrink flex-grow basis-[15vmax] min-w-[15vmax]'
                  key={animes.id}
                >
                  <img
                    src={animes.attributes.posterImage?.original}
                    alt='anime cover'
                    width={500}
                    height={500}
                    className='w-full h-auto inline-block rounded-lg'
                  />
                  <p className='text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full'>
                    {animes.attributes.titles.en}
                  </p>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => scrollLeft(animeScrollContainer)}
            className='text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 left-0 hidden md:group-hover:inline-block rounded-lg'
            type='button'
          >
            <FaChevronLeft className='opacity-60 hover:opacity-100' />
          </button>
          <button
            onClick={() => scrollRight(animeScrollContainer)}
            className='text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 right-0 hidden md:group-hover:inline-block rounded-lg'
            type='button'
          >
            <FaChevronRight className='opacity-60 hover:opacity-100' />
          </button>
        </div>
        <button
          type='button'
          className='text-[1.2vmax] capitalize border hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#f97316,0_0_15px_#f97316,0_0_30px_#f97316] transition duration-300 bg-orange-500 text-neutral-100 rounded-xl border-orange-500 px-[2vmax] py-[2vmin] self-center'
        >
          explore all
        </button>
      </div>
      <div className='flex flex-col items-center gap-[4vmin] my-[3vmin] mx-[3vmax]'>
        <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
          What can you expect from us!
        </h1>
        <div className='flex flex-col items-center gap-[4vmin]'>
          <div className='flex items-center'>
            <p className='text-center text-[1.8vmax] font-medium text-neutral-900 max-w-[55vmax]'>
              Immerse yourself in the captivating world of anime with AnimeXhuB.
              Explore a vast collection of anime series, movies, and OVA
              episodes. From timeless classics to the latest releases, AnimeXhuB
              is your gateway to endless anime entertainment.
            </p>
            <motion.div
              initial={false}
              animate={
                isInView.expect1
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, expect1: true }))
              }
            >
              <img
                src='/animexhub/what-can-you-expect-cover1.jpg'
                alt='what-can-you-expect-cover'
                className='max-h-[70vmin] shadow-xl rounded-lg'
              />
            </motion.div>
          </div>
          <div className='flex items-center'>
            <motion.div
              initial={false}
              animate={
                isInView.expect2
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, expect2: true }))
              }
            >
              <img
                src='/animexhub/what-can-you-expect-cover2.jpg'
                alt='what-can-you-expect-cover'
                className='max-h-[70vmin] shadow-xl rounded-lg'
              />
            </motion.div>
            <p className='text-center text-[1.8vmax] font-medium text-neutral-900 max-w-[55vmax]'>
              Step into the exciting realm of manga with AnimeXhuB. Discover a
              treasure trove of manga titles, from beloved classics to the
              hottest new releases. Dive into captivating stories, vibrant
              artwork, and rich storytelling that will keep you hooked for
              hours.
            </p>
          </div>
          <div className='flex items-center'>
            <p className='text-center text-[1.8vmax] font-medium text-neutral-900 max-w-[55vmax]'>
              Join a thriving community of anime and manga enthusiasts on
              AnimeXhuB. Share your passion, discuss your favorite series, and
              connect with like-minded fans from around the world. Stay updated
              on the latest news, trends, and discussions in the anime and manga
              community.
            </p>
            <motion.div
              initial={false}
              animate={
                isInView.expect3
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, expect3: true }))
              }
            >
              <img
                src='/animexhub/what-can-you-expect-cover3.jpg'
                alt='what-can-you-expect-cover'
                className='max-h-[70vmin] shadow-xl rounded-lg'
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-[4vmin] mx-[3vmax] my-[3vmin]'>
        <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
          List of some top trending manga this week.
        </h1>
        <div className='relative group'>
          <div
            className='flex items-center gap-[2vmax] overflow-hidden no-scrollbar overflow-x-scroll max-w-[45vmax] sm:max-w-[65vmax] lg:max-w-[85vmax] scroll-smooth'
            ref={mangaScrollContainer}
          >
            {isLoading ? (
              <Loader />
            ) : (
              topTrendingManga?.data?.slice(0, 10).map((manga) => (
                <div
                  className='flex items-stretch relative flex-shrink flex-grow basis-[15vmax] min-w-[15vmax]'
                  key={manga.id}
                >
                  <img
                    src={manga.attributes.posterImage?.original}
                    alt='anime cover'
                    width={500}
                    height={500}
                    className='w-full h-auto inline-block rounded-lg'
                  />
                  <p className='text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full'>
                    {manga.attributes.titles.en}
                  </p>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => scrollLeft(mangaScrollContainer)}
            className='text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 left-0 hidden md:group-hover:inline-block rounded-lg'
            type='button'
          >
            <FaChevronLeft className='opacity-60 hover:opacity-100' />
          </button>
          <button
            onClick={() => scrollRight(mangaScrollContainer)}
            className='text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 right-0 hidden md:group-hover:inline-block rounded-lg'
            type='button'
          >
            <FaChevronRight className='opacity-60 hover:opacity-100' />
          </button>
        </div>
        <button
          type='button'
          className='text-[1.2vmax] capitalize border hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#f97316,0_0_15px_#f97316,0_0_30px_#f97316] transition duration-300 bg-orange-500 text-neutral-100 rounded-xl border-orange-500 px-[2vmax] py-[2vmin] self-center'
        >
          explore all
        </button>
      </div>
      <div className='flex flex-col items-center gap-[4vmin] my-[3vmin] mx-[3vmax]'>
        <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
          Why Anime lovers preferred our reviews &amp; recommendations!
        </h1>
        <div className='flex items-center'>
          <div className='flex items-start flex-col gap-[2vmin]'>
            <p className='text-[1.4vmax] font-medium text-neutral-900 max-w-[55vmax]'>
              AnimeXhub utilizes the powerful Kitsu API to provide a vast and
              constantly updated library of anime titles. Our extensive
              collection ensures you&apos;ll always find something new and
              exciting to watch.
            </p>
            <p className='text-[1.4vmax] font-medium text-neutral-900 max-w-[55vmax]'>
              We&apos;ve organized our content to be visually appealing and easy
              to navigate. With intuitive categories, advanced search options,
              and personalized recommendations, finding your next favorite anime
              has never been easier. Our clean, modern design enhances your
              browsing experience.
            </p>
            <p className='text-[1.4vmax] font-medium text-neutral-900 max-w-[55vmax]'>
              Each anime title on AnimeXhub comes with a detailed profile,
              including synopses, genre classifications, episode guides, and
              user reviews. This wealth of information helps you make informed
              decisions about what to watch next.
            </p>
            <p className='text-[1.4vmax] font-medium text-neutral-900 max-w-[55vmax]'>
              We&apos;re committed to providing the best possible experience for
              our users. That&apos;s why we continuously update our platform
              with new features, improvements, and the latest anime releases.
            </p>
          </div>
          <motion.div
            initial={false}
            animate={
              isInView.whyUs
                ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
            }
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() =>
              setIsInView((prev) => ({ ...prev, whyUs: true }))
            }
          >
            <img
              src='/animexhub/why-us.png'
              alt='what-can-you-expect-cover'
              className='max-h-[70vmin] shadow-xl rounded-lg'
            />
          </motion.div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-[4vmin] mx-[3vmax] my-[3vmin]'>
        <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
          List of some comments.
        </h1>
        <div className='relative group'>
          <div
            className='flex items-stretch gap-[2vmax] overflow-hidden no-scrollbar overflow-x-scroll max-w-[45vmax] sm:max-w-[65vmax] lg:max-w-[85vmax] scroll-smooth'
            ref={reactionScrollContainer}
          >
            {isLoading ? (
              <Loader />
            ) : (
              reactions?.data?.slice(0, 10).map((reaction) => (
                <div
                  className='flex flex-col items-stretch relative flex-shrink flex-grow basis-[35vmax] px-[2vmax] py-[2vmin] bg-black bg-opacity-50 rounded-xl gap-[3vmin]'
                  key={reaction.id}
                >
                  {reactions?.included?.map(
                    (item) =>
                      item.type === "users" &&
                      item.id === reaction.relationships.user.data.id && (
                        <div
                          key={item.id}
                          className='flex items-center gap-[1vmin]'
                        >
                          <img
                            src={item.attributes.avatar.original}
                            alt='user avatar'
                            className='max-w-[3vmax] max-h-[3vmax] rounded-full'
                          />
                          <h2 className='text-[1.3vmax] font-semibold text-neutral-100'>
                            {item.attributes.name}
                          </h2>
                        </div>
                      )
                  )}
                  <p className='text-[1.5vmax] font-bold text-neutral-100 min-w-[25vmax]'>
                    {reaction.attributes.reaction}
                  </p>
                  {reactions?.included?.map(
                    (item) =>
                      item.type === "manga" &&
                      reaction.relationships.manga.data &&
                      item.id === reaction.relationships.manga.data.id && (
                        <div
                          key={item.id}
                          className='flex items-center gap-[1vmin]'
                        >
                          <h2 className='text-[1.3vmax] font-semibold text-neutral-100'>
                            Manga name:{" "}
                            {item.attributes.titles.en ||
                              item.attributes.titles.en_jp}
                          </h2>
                        </div>
                      )
                  )}
                  {reactions?.included?.map(
                    (item) =>
                      item.type === "anime" &&
                      reaction.relationships.anime.data &&
                      item.id === reaction.relationships.anime.data.id && (
                        <div
                          key={item.id}
                          className='flex items-center gap-[1vmin]'
                        >
                          <h2 className='text-[1.3vmax] font-semibold text-neutral-100'>
                            Anime name:{" "}
                            {item.attributes.titles.en ||
                              item.attributes.titles.en_jp}
                          </h2>
                        </div>
                      )
                  )}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => scrollLeft(reactionScrollContainer)}
            className='text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 left-0 hidden md:group-hover:inline-block rounded-lg'
            type='button'
          >
            <FaChevronLeft className='opacity-60 hover:opacity-100' />
          </button>
          <button
            onClick={() => scrollRight(reactionScrollContainer)}
            className='text-[4vmax] text-neutral-100 bg-black bg-opacity-60 h-full absolute top-0 right-0 hidden md:group-hover:inline-block rounded-lg'
            type='button'
          >
            <FaChevronRight className='opacity-60 hover:opacity-100' />
          </button>
        </div>
      </div>
      <div className='flex flex-col items-center gap-[4vmin] mx-[3vmax] my-[3vmin]'>
        <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
          What type of anime or manga you are looking for?
        </h1>
        <h2 className='text-[1.8vmax] font-medium text-neutral-900'>
          You can find animes &amp; mangas based on your choice!
        </h2>
        <div className='grid grid-cols-6 flex-wrap justify-items-stretch gap-[4vmin] my-[4vmin]'>
          {categories?.data?.map((cat) => (
            <Link
              to={`/category/${cat.id}`}
              className='even:text-fuchsia-700 odd:text-indigo-800 border-2 px-[1vmin] py-[0.5vmin] rounded-md odd:border-fuchsia-700 even:border-indigo-800 shadow cursor-pointer'
              key={cat.id}
            >
              <p className='text-[2.8vmin] font-semibold text-center'>
                {cat.attributes.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <motion.div
        className="bg-[url('/newsletter-bg.jpg')] bg-no-repeat bg-center"
        initial={{ backgroundSize: "0%" }}
        whileInView={{ backgroundSize: "100%" }}
        transition={{ duration: 1 }}
      >
        <div className='flex flex-col items-center justify-center bg-black bg-opacity-70 gap-[2vmax] min-h-[40vh]'>
          <h1 className='text-[2vmax] font-bold text-neutral-300'>
            Not done yet. There is still many more.
          </h1>
          <p className='text-[1.6vmax] font-medium text-neutral-300'>
            Subscribe to our newsletter in order to get in touch with us.
          </p>
          <div className='flex items-center border border-neutral-600 px-[2vmax] py-[1vmin] rounded-3xl bg-neutral-700 bg-opacity-50'>
            <input
              type='email'
              placeholder='Enter your email'
              className='bg-transparent focus:outline-none text-neutral-300'
            />
            <button
              type='button'
              className='rounded-3xl bg-neutral-700 bg-opacity-50 capitalize text-neutral-300'
            >
              subscribe
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Home;
