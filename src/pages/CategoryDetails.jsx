import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState({});
  const [categoriesAnime, setCategoriesAnime] = useState([]);
  const [categoriesManga, setCategoriesManga] = useState([]);
  const [carouselData, setCarouselData] = useState([]);

  const {
    data: categoryDetailsData,
    error: categoryDetailsError,
    loading: categoryDetailsLoading,
  } = useFetch(`/categories?filter[slug]=${categoryId}`);

  const {
    data: categoryAnimeData,
    error: categoryAnimeError,
    loading: categoryAnimeLoading,
  } = useFetch(
    `/anime?filter[categories]=${categoryId}&filter[status]=current,finished`
  );

  const {
    data: categoryMangaData,
    error: categoryMangaError,
    loading: categoryMangaLoading,
  } = useFetch(`/manga?filter[categories]=${categoryId}`);

  useEffect(() => {
    if (!categoryAnimeData || !categoryDetailsData || !categoryMangaData) {
      return;
    }
    setCategoryDetails(categoryDetailsData.data[0]);
    setCategoriesAnime(categoryAnimeData.data);
    setCarouselData(categoryAnimeData.data.slice(0, 3));
    setCategoriesManga(categoryMangaData.data);
  }, [categoryDetailsLoading, categoryAnimeLoading, categoryMangaLoading]);

  if (categoryAnimeLoading) {
    return <Loader />;
  }

  return (
    <>
      <Carousel slides={carouselData} />
      <main className="flex flex-col items-stretch justify-center gap-[4vmin] mx-[3vmax] my-[3vmin]">
        <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
          Category name:{" "}
          <span className="font-bold">{categoryDetails.attributes?.title}</span>
        </h1>
        <p className="text-[1.8vmax] font-medium text-neutral-900 self-stretch line-clamp-6">
          <span className="font-bold">Category description:</span>{" "}
          {categoryDetails.attributes?.description}
        </p>
        <div className="flex flex-col items-center gap-[4vmin]">
          <div className="flex flex-col items-start gap-[2vmin]">
            <h3 className="text-[1.7vmax] font-medium text-neutral-900 underline">
              Animes based on category {categoryDetails?.attributes?.title}
            </h3>
            <div className="flex justify-center flex-wrap gap-[3vmin]">
              {categoriesAnime?.map((anime) => (
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
                    {anime.attributes.titles.en ||
                      anime.attributes.titles.en_jp}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="text-[1.2vmax] capitalize border hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#f97316,0_0_15px_#f97316,0_0_30px_#f97316] transition duration-300 bg-orange-500 text-neutral-100 rounded-xl border-orange-500 px-[2vmax] py-[2vmin] self-center"
          >
            view more
          </button>
        </div>
        <div className="flex flex-col items-center gap-[4vmin]">
          <div className="flex flex-col items-start gap-[2vmin]">
            <h3 className="text-[1.7vmax] font-medium text-neutral-900 underline">
              Mangas based on category {categoryDetails?.attributes?.title}
            </h3>
            <div className="flex justify-center flex-wrap gap-[3vmin]">
              {categoriesManga?.map((manga) => (
                <div
                  className="flex items-stretch relative flex-shrink flex-grow basis-[15vmax] min-w-[15vmax]"
                  key={manga.id}
                >
                  <img
                    src={manga.attributes.posterImage?.original}
                    alt="anime cover"
                    width={500}
                    height={500}
                    className="w-full h-auto inline-block rounded-lg"
                  />
                  <p className="text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full">
                    {manga.attributes.titles.en ||
                      manga.attributes.titles.en_jp}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="text-[1.2vmax] capitalize border hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#f97316,0_0_15px_#f97316,0_0_30px_#f97316] transition duration-300 bg-orange-500 text-neutral-100 rounded-xl border-orange-500 px-[2vmax] py-[2vmin] self-center"
          >
            view more
          </button>
        </div>
      </main>
    </>
  );
};

export default CategoryDetails;
