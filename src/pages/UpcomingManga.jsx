import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import StaticCarousel from "../components/StaticCarousel";

const UpcomingManga = () => {
  const [upcomingManga, setUpcomingManga] = useState([]);
  const [offset, setOffset] = useState(0);

  const {
    data: upcomingMangaData,
    error: upcomingMangaError,
    loading: upcomingMangaLoading,
  } = useFetch(
    `/manga?filter[status]=upcoming&page[limit]=10&page[offset]=${offset}`
  );

  useEffect(() => {
    if (!upcomingMangaData) {
      return;
    }
    setUpcomingManga((prevState) => [...prevState, ...upcomingMangaData.data]);
  }, [upcomingMangaLoading]);

  if (upcomingMangaLoading) {
    return <Loader />;
  }

  return (
    <>
      <StaticCarousel />
      <main className='flex flex-col items-center justify-center gap-[4vmin] mx-[3vmax] my-[3vmin]'>
        <h1 className='text-[2.5vmax] font-semibold text-neutral-900'>
          Upcoming animes which will be air very soon
        </h1>
        <div className='flex flex-col items-center gap-[4vmin]'>
          <div className='flex flex-col items-start gap-[2vmin]'>
            <div className='flex justify-center flex-wrap gap-[3vmin]'>
              {upcomingMangaLoading ? (
                <Loader />
              ) : (
                upcomingManga?.map((manga) => (
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
                    <p className='text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full line-clamp-2'>
                      {manga.attributes.titles.en ||
                        manga.attributes.titles.en_jp}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <button
            type='button'
            onClick={() => setOffset(offset + 10)}
            className='text-[1.2vmax] capitalize border hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#f97316,0_0_15px_#f97316,0_0_30px_#f97316] transition duration-300 bg-orange-500 text-neutral-100 rounded-xl border-orange-500 px-[2vmax] py-[2vmin] self-center'
          >
            view more
          </button>
        </div>
      </main>
    </>
  );
};

export default UpcomingManga;
