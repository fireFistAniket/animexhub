import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { FaFileAlt, FaStar } from "react-icons/fa";
import ReactPlayer from "react-player";

const MangaDetails = () => {
  const { mangaId } = useParams();
  const [mangaDetails, setMangaDetails] = useState({});
  const [mangaDetailsIncluded, setMangaDetailsIncluded] = useState([]);
  const [mangaReviwes, setMangaReviews] = useState([]);
  const [mangaReviwesIncluded, setMangaReviewsIncluded] = useState([]);

  const {
    data: mangaData,
    error: mangaDataError,
    loading: mangaDataLoading,
  } = useFetch(`/manga/${mangaId}?include=categories,quotes,reviews`);

  const {
    data: mangaReviewsData,
    error: mangaReviewsDataError,
    loading: mangaReviewsDataLoading,
  } = useFetch(`/manga/${mangaId}/reviews?include=user`);

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
    if (!mangaData || !mangaReviewsData) {
      return;
    }
    setMangaDetails(mangaData.data);
    setMangaDetailsIncluded(mangaData.included);
    setMangaReviews(mangaReviewsData.data);
    setMangaReviewsIncluded(mangaReviewsData.included);
  }, [mangaDataLoading, mangaReviewsDataLoading]);

  return (
    <main className="flex flex-col items-start justify-center gap-[4vmin]">
      <img
        src={
          mangaDetails.attributes?.coverImage?.original ||
          "/animexhub/nav-footer-bg.png"
        }
        alt="anime-cover"
        className="w-full max-h-[65vh] xl:max-h-[70vh] object-cover"
      />
      <div className="flex gap-[2vmax] mx-[3vmax]">
        <img
          src={mangaDetails.attributes?.posterImage?.original}
          alt="anime cover"
          width={500}
          height={500}
          className="max-w-[15vmax] rounded-lg"
        />
        <div className="flex flex-col gap-[2vmin]">
          <div className="flex items-center gap-[3vmin]">
            <h1 className="text-[2.5vmax] font-bold text-neutral-100">
              {mangaDetails.attributes?.titles.en ||
                mangaDetails.attributes?.titles.en_jp}
            </h1>
            <p className="bg-white rounded-md text-[1.2vmax] font-semibold px-[2vmin] py-[0.5vmin] shadow shadow-neutral-600">
              {mangaDetails.attributes?.ageRating}
            </p>
          </div>
          <div className="flex items-center gap-[3vmin]">
            <p className="text-[1.5vmax] flex items-center gap-2 font-medium text-neutral-100">
              Rating:{" "}
              {Math.round(
                parseInt(mangaDetails.attributes?.averageRating) / 10
              )}
              <FaStar color="#fece3c" />
            </p>
            <p className="text-[1.5vmax] flex items-center gap-2 font-medium text-neutral-100">
              First Published:{" "}
              {formatDateString(mangaDetails.attributes?.startDate)}
            </p>
          </div>
          <div className="flex items-center gap-[3vmin]">
            <p className="bg-indigo-600 rounded-md text-[1.2vmax] text-[--primary] font-semibold px-[2vmin] py-[0.5vmin] shadow shadow-neutral-600 uppercase">
              {mangaDetails.attributes?.status}
            </p>
            <div className="bg-teal-600 rounded-md text-[1.2vmax] text-[--primary] font-semibold px-[2vmin] py-[0.5vmin] shadow shadow-neutral-600 capitalize flex items-center gap-[0.5vmax]">
              <FaFileAlt />
              <p className="">
                volumes: {mangaDetails.attributes?.volumeCount}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-[3vmin] my-[2vmin]">
            {mangaDetailsIncluded?.map(
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
          {mangaDetails.attributes?.description ||
            mangaDetails.attributes?.synopsis}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center my-[3vmin] mx-[3vmax] gap-[3vmin] self-stretch">
        <h1 className="text-[2vmax] font-bold capitalize underline">Reviews</h1>
        {mangaReviwes.length <= 0 ? (
          <p className="text-[2vmax] font-medium">Not reviewd yet.</p>
        ) : (
          <div className="flex flex-wrap items-stretch gap-[2vmax] mx-[3vmax]">
            {mangaReviwes.map((reaction) => (
              <div
                className="flex flex-col items-stretch relative flex-shrink flex-grow basis-[35vmax] px-[2vmax] py-[2vmin] bg-black bg-opacity-50 rounded-xl gap-[3vmin]"
                key={reaction.id}
              >
                {mangaReviwesIncluded.map(
                  (item) =>
                    reaction.relationships.user.data.id === item.id && (
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
                  className="text-[1.5vmax] font-bold text-neutral-100 min-w-[25vmax] line-clamp-4"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MangaDetails;
