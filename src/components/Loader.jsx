import React from "react";

const Loader = () => {
  return (
    <div className='flex flex-col gap-[4vmax] items-center justify-center min-h-[50vh] min-w-[50vw]'>
      <div className='loader'></div>
      <p className='text-[1.5vmax] capitalize font-medium'>fetching data ...</p>
    </div>
  );
};

export default Loader;
