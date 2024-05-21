import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState({});
  const [categoriesAnime, setCategoriesAnime] = useState([]);

  const {
    data: categoryDetailsData,
    error: categoryDetailsError,
    loading: categoryDetailsLoading,
  } = useFetch(`/categories?filter[slug]=${categoryId}`);

  const {
    data: categoryAnimeData,
    error: categoryAnimeError,
    loading: categoryAnimeLoading,
  } = useFetch(`/anime?filter[categories]=${categoryId}`);

  useEffect(() => {
    if (!categoryDetailsData || !categoryAnimeData) {
      return;
    }
    setCategoryDetails(categoryDetailsData.data[0]);
    setCategoriesAnime(categoryAnimeData.data);
  }, [
    categoryDetailsLoading,
    categoryDetailsData,
    categoryAnimeData,
    categoryAnimeLoading,
  ]);

  if (categoryDetailsLoading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col items-stretch justify-center gap-[4vmin] mx-[3vmax]">
      <h1 className="text-[2.5vmax] font-semibold text-neutral-900">
        Category name:{" "}
        <span className="font-bold">{categoryDetails.attributes?.title}</span>
      </h1>
      <div className="flex flex-col items-center gap-[4vmin]">
        <p className="text-[1.8vmax] font-medium text-neutral-900">
          Category description: {categoryDetails.attributes?.description}
        </p>
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
                  {anime.attributes.titles.en || anime.attributes.titles.en_jp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryDetails;
