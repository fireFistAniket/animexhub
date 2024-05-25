import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import Itemcard from "../components/Itemcard";

const TrendingAnime = () => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [trendingManga, setTrendingManga] = useState([]);
  const [carouselData, setCarouselData] = useState([]);

  const {
    data: trendingAnimeData,
    error: trendingAnimeError,
    loading: trendingAnimeLoading,
  } = useFetch(`/trending/anime`);

  const {
    data: trendingMangaData,
    error: trendingMangaError,
    loading: trendingMangaLoading,
  } = useFetch(`/trending/manga`);

  useEffect(() => {
    if (!trendingAnimeData || !trendingMangaData) {
      return;
    }
    setTrendingAnime(trendingAnimeData.data);
    setTrendingManga(trendingMangaData.data);
    setCarouselData(trendingAnimeData.data.slice(0, 3));
  }, [
    trendingAnimeData,
    trendingAnimeLoading,
    trendingMangaData,
    trendingMangaLoading,
  ]);

  if (trendingAnimeLoading || trendingMangaLoading) {
    return <Loader />;
  }

  return (
    <>
      <Carousel slides={carouselData} />
      <main className="flex flex-col items-center justify-center gap-[4vmin] mx-[3vmax] my-[3vmin]">
        <div className="flex flex-col items-start gap-[2vmin]">
          <h3 className="text-[1.7vmax] font-medium text-neutral-900 underline">
            Top trending Animes this week
          </h3>
          <div className="flex justify-center flex-wrap gap-[3vmin]">
            {trendingAnime?.map((anime) => (
              <div
                className="flex items-stretch relative flex-shrink flex-grow basis-[15vmax] min-w-[15vmax]"
                key={anime.id}
              >
                <img
                  src={anime.attributes.posterImage?.original}
                  alt="anime cover"
                  width={500}
                  height={500}
                  className="w-full h-auto inline-block rounded-lg"
                />
                <p className="text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full">
                  {anime.attributes.titles.en || anime.attributes.titles.en_jp}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-[2vmin]">
          <h3 className="text-[1.7vmax] font-medium text-neutral-900 underline">
            Top trending Mangas this week
          </h3>
          <div className="flex justify-center flex-wrap gap-[3vmin]">
            {trendingManga?.map((manga) => (
              <Itemcard item={manga} key={manga.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default TrendingAnime;
