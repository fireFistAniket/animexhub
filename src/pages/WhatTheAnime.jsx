import React, { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import Loader from "../components/Loader";

const WhatTheAnime = () => {
  const [image, setImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const req = await fetch(import.meta.env.VITE_IMAGE_SEARCH_API, {
        method: "POST",
        body: formData,
      });
      const res = await req.json();
      console.log(res);
      setSearchResults(res.result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  return (
    <main className="flex flex-col items-center gap-[2vh] my-[3vmin]">
      <h1 className="capitalize text-[2.6vmax] font-bold">what this anime!</h1>
      <p className="text-[1.2vmax] max-w-[65vw] text-center">
        Discover your favorite anime moments with AnimeXhuB&apos;s scene-based
        search feature. Simply upload an image or describe a scene, and our
        advanced AI will find the exact episode and timestamp from a vast
        library of anime series. Whether you&apos;re looking for iconic battles,
        heartwarming moments, or specific characters, our scene search makes it
        easy to relive your favorite anime experiences. Perfect for fans and
        researchers alike, AnimeXhuB brings precision and fun to your anime
        journey.
      </p>
      <div className="flex items-center my-[3vmin]">
        <div
          {...getRootProps()}
          className="min-w-[45vw] min-h-[45vh] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {!image ? (
            <p className="text-gray-500 text-[1.6vmax] font-semibold">
              Drag 'n' drop your scene here, or click to select image
            </p>
          ) : (
            <div className="mt-4">
              <img src={image} alt="Preview" className="max-w-full max-h-80" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="capitalize text-[2vmax] font-semibold underline">
          results
        </h1>
        <div className="flex flex-wrap justify-center gap-[2vmin]">
          {loading ? (
            <Loader />
          ) : searchResults.length <= 0 ? (
            <p className="text-[2vmax] font-medium underline">
              No input found...
            </p>
          ) : (
            searchResults.map((item, index) => (
              <div key={index}>
                <ReactPlayer url={item.video} controls />
                <p className="text-[2vmin] font-semibold">
                  Anime name: {item.anilist.title.english}
                </p>
                <p className="text-[1.6vmin] font-medium">
                  Episode number: {item.episode}
                </p>
                <p className="text-[1.6vmin] font-medium">
                  Similarity: {Math.round(item.similarity * 100)} %
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default WhatTheAnime;
