import React, { useEffect, useState } from "react";

const ImageGallery = ({ images }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(images[0].original);
  }, []);

  return (
    <div className="w-full">
      <div class="w-full rounded-lg  overflow-hidden">
        <img src={image} class={"w-full h-full"} />
      </div>
      <div class="flex flex-wrap">
        {images.map((image, index) => {
          return (
            <div class="mr-2 mt-2" key={index}>
              <img
                src={image.original}
                width={"200px"}
                class={
                  "rounded-lg border-4 border-transparent hover:cursor-pointer hover:border-blue-500"
                }
                onClick={() => setImage(image.original)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
