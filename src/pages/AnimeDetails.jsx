import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { FaStar } from "react-icons/fa";
import ReactPlayer from "react-player";

const AnimeDetails = () => {
  const { animeId } = useParams();
  const [animeDetails, setAnimeDetails] = useState({});
  const [animeDetailsIncluded, setAnimeDetailsIncluded] = useState([]);
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [animeReviwes, setAnimeReviews] = useState([]);
  const [animeReviwesIncluded, setAnimeReviewsIncluded] = useState([]);

  const {
    data: animeData,
    error: animeDataError,
    loading: animeDataLoading,
  } = useFetch(`/anime/${animeId}?include=categories`);

  const {
    data: animeEpisodesData,
    error: animeEpisodesDataError,
    loading: animeEpisodesDataLoading,
  } = useFetch(`/anime/${animeId}/episodes`);

  const {
    data: animeReviewsData,
    error: animeReviewsDataError,
    loading: animeReviewsDataLoading,
  } = useFetch(`/anime/${animeId}/reviews?include=user`);

  const {
    data: animeCharactersData,
    error: animeCharactersDataError,
    loading: animeCharactersDataLoading,
  } = useFetch(`/anime/${animeId}/characters?include=character`);

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const formattedDay = getOrdinalSuffix(day);

    return `${formattedDay} ${month}, ${year}`;
  };

  useEffect(() => {
    if (!animeData || !animeEpisodesData || !animeReviewsData) {
      return;
    }
    setAnimeDetails(animeData.data);
    setAnimeDetailsIncluded(animeData.included);
    setAnimeEpisodes(animeEpisodesData.data);
    setAnimeReviews(animeReviewsData.data);
    setAnimeReviewsIncluded(animeReviewsData.included);
  }, [animeDataLoading, animeEpisodesDataLoading, animeReviewsDataLoading]);

  return (
    <main className="flex flex-col items-start justify-center gap-[4vmin]">
      <img
        src={
          animeDetails.attributes?.coverImage?.original ||
          "/animexhub/nav-footer-bg.png"
        }
        alt="anime-cover"
        className="w-full max-h-[70vh] object-cover"
      />
      <div className="flex gap-[2vmax] mx-[3vmax]">
        <img
          src={animeDetails.attributes?.posterImage?.original}
          alt="anime cover"
          width={500}
          height={500}
          className="max-w-[15vmax] rounded-lg"
        />
        <div className="flex flex-col gap-[2vmin]">
          <div className="flex items-center gap-[3vmin]">
            <h1 className="text-[2.5vmax] font-bold text-neutral-100">
              {animeDetails.attributes?.titles.en ||
                animeDetails.attributes?.titles.en_jp}
            </h1>
            <p className="bg-white rounded-md text-[1.2vmax] font-semibold px-[2vmin] py-[0.5vmin] shadow shadow-neutral-600">
              {animeDetails.attributes?.ageRating}
            </p>
          </div>
          <div className="flex items-center gap-[3vmin]">
            <p className="text-[1.5vmax] flex items-center gap-2 font-medium text-neutral-100">
              Rating:{" "}
              {Math.round(
                parseInt(animeDetails.attributes?.averageRating) / 10
              )}
              <FaStar color="#fece3c" />
            </p>
            <p className="text-[1.5vmax] flex items-center gap-2 font-medium text-neutral-100">
              First Air: {formatDateString(animeDetails.attributes?.startDate)}
            </p>
          </div>
          <div className="flex items-center gap-[3vmin]">
            <p className="bg-teal-600 rounded-md text-[1.2vmax] text-[--primary] font-semibold px-[2vmin] py-[0.5vmin] shadow shadow-neutral-600">
              {animeDetails.attributes?.showType}
            </p>
            <p className="bg-indigo-600 rounded-md text-[1.2vmax] text-[--primary] font-semibold px-[2vmin] py-[0.5vmin] shadow shadow-neutral-600 uppercase">
              {animeDetails.attributes?.status}
            </p>
          </div>
          <div className="flex flex-wrap gap-[3vmin] my-[2vmin]">
            {animeDetailsIncluded?.map(
              (cat) =>
                cat.type == "categories" && (
                  <Link
                    to={`/category/${cat.attributes?.slug}`}
                    className="even:text-fuchsia-700 odd:text-indigo-800 border-2 px-[1vmin] py-[0.5vmin] rounded-md odd:border-fuchsia-700 even:border-indigo-800 shadow cursor-pointer"
                    key={cat.id}
                  >
                    <p className="text-[2vmin] font-semibold text-center">
                      {cat.attributes?.title}
                    </p>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
      <div className="mx-[3vmax]">
        <p className="text-[2vmin] font-medium">
          {animeDetails.attributes?.description ||
            animeDetails.attributes?.synopsis}
        </p>
      </div>
      <div className="flex items-center justify-center w-full my-[3vmin]">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${animeDetails.attributes?.youtubeVideoId}`}
          style={{
            maxWidth: "60vmax",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center my-[3vmin] mx-[3vmax] gap-[3vmin] self-stretch">
        <h1 className="text-[2vmax] font-bold capitalize underline">
          episodes
        </h1>
        <div className="flex justify-center flex-wrap gap-[2vmin]">
          {!animeEpisodes[0]?.attributes?.thumbnail ? (
            <p className="text-[2vmax] font-medium">
              Currently airing. Data not available
            </p>
          ) : (
            animeEpisodes.map(
              (item) =>
                item.attributes?.thumbnail && (
                  <div
                    key={item.id}
                    className="flex items-stretch relative flex-shrink flex-grow basis-[20vmax]"
                  >
                    <div className="flex flex-col">
                      <img
                        src={item.attributes?.thumbnail?.original}
                        alt="anime cover"
                        width={500}
                        height={500}
                        className="w-full h-auto inline-block rounded-lg"
                      />
                      <p className="text-[1.5vmax] font-bold text-neutral-100 text-center w-full">
                        {item.attributes.titles.en ||
                          item.attributes.titles.en_jp}
                      </p>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-[3vmin] mx-[3vmax] gap-[3vmin] self-stretch">
        <h1 className="text-[2vmax] font-bold capitalize underline">Reviews</h1>
        {animeReviwes.length <= 0 ? (
          <p className="text-[2vmax] font-medium">Not reviewd yet.</p>
        ) : (
          <div className="flex flex-wrap items-stretch gap-[2vmax] mx-[3vmax]">
            {animeReviwes.map((reaction) => (
              <div
                className="flex flex-col items-stretch relative flex-shrink flex-grow basis-[35vmax] px-[2vmax] py-[2vmin] bg-black bg-opacity-50 rounded-xl gap-[3vmin]"
                key={reaction.id}
              >
                {animeReviwesIncluded.map(
                  (item) =>
                    reaction.relationships?.user?.data?.id === item.id && (
                      <div
                        key={item.id}
                        className="flex items-center gap-[1vmin]"
                      >
                        <img
                          src={item.attributes?.avatar?.original}
                          alt="user avatar"
                          className="max-w-[3vmax] max-h-[3vmax] rounded-full object-cover"
                        />
                        <h2 className="text-[1.3vmax] font-semibold text-neutral-100">
                          {item.attributes?.name}
                        </h2>
                      </div>
                    )
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      reaction.attributes?.contentFormatted ||
                      reaction.attributes?.content,
                  }}
                  className="text-[1vmax] font-bold text-neutral-100 min-w-[25vmax] line-clamp-4"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AnimeDetails;
