import React from "react";
import { Link } from "react-router-dom";

const Itemcard = ({ item }) => {
  return (
    <Link
      to={`/${item.type}-details/${item.id}`}
      className="flex items-stretch relative flex-shrink flex-grow basis-[15vmax] min-w-[15vmax]"
    >
      <img
        src={item.attributes.posterImage?.original}
        alt="anime cover"
        width={500}
        height={500}
        className="w-full h-auto inline-block rounded-lg"
      />
      <p className="text-[1.5vmax] font-bold absolute bottom-0 bg-black bg-opacity-50 text-neutral-100 text-center w-full line-clamp-3">
        {item.attributes.titles.en || item.attributes.titles.en_jp}
      </p>
    </Link>
  );
};

export default Itemcard;
