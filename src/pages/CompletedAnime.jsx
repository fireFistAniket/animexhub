import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import Itemcard from "../components/Itemcard";

const CompletedAnime = () => {
  const [completedAnimes, setCompletedAnime] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [offset, setOffset] = useState(0);

  const {
    data: completedAnimeData,
    error: completedAnimeError,
    loading: completedAnimeLoading,
  } = useFetch(
    `/anime?filter[status]=finished&page[limit]=10&page[offset]=${offset}`
  );

  useEffect(() => {
    if (!completedAnimeData) {
      return;
    }
    setCompletedAnime((prevState) => [
      ...prevState,
      ...completedAnimeData.data,
    ]);
    setCarouselData(completedAnimeData.data.slice(0, 3));
  }, [completedAnimeLoading]);

  return (
    <>
      <Carousel slides={carouselData} />
      <main className="flex flex-col items-center justify-center gap-[4vmin] mx-[3vmax] my-[3vmin]">
        <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
          Ongoing animes till date
        </h1>
        <div className="flex flex-col items-center gap-[4vmin]">
          <div className="flex flex-col items-start gap-[2vmin]">
            <div className="flex justify-center flex-wrap gap-[3vmin]">
              {completedAnimeLoading ? (
                <Loader />
              ) : (
                completedAnimes?.map((anime) => (
                  <Itemcard item={anime} key={anime.id} />
                ))
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOffset(offset + 10)}
            className="text-[1.2vmax] capitalize border hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#f97316,0_0_15px_#f97316,0_0_30px_#f97316] transition duration-300 bg-orange-500 text-neutral-100 rounded-xl border-orange-500 px-[2vmax] py-[2vmin] self-center"
          >
            view more
          </button>
        </div>
      </main>
    </>
  );
};

export default CompletedAnime;
