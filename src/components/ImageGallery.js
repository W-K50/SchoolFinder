import { GetGalleryImage } from "@/Config/Urls";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ImageGallery = ({ images }) => {
  const [imageState, setImageState] = useState("");

  const AuthState = useSelector((state) => state.Auth_Reducer.users);
  const SchoolProfileState = useSelector(
    (state) => state.Auth_Reducer?.SchoolProfile
  );

  useEffect(() => {
    if (images) {
      setImageState(images[0]);
    }
  }, [images]);

  return (
    <div className="w-full">
      <div class="w-full h-full overflow-hidden items-center justify-center flex">
        <img
          src={GetGalleryImage(AuthState?.id, imageState)}
          class={"w-full md:w-1/2 md:h-96 rounded-lg"}
        />
      </div>
      <div class="flex flex-wrap">
        {images?.map((image, index) => {
          return (
            <div class="mr-2 mt-2" key={index}>
              <img
                src={GetGalleryImage(AuthState?.id, image)}
                width={"150px"}
                class={
                  "rounded-lg border-4 border-transparent hover:cursor-pointer hover:border-blue-500"
                }
                onClick={() => setImageState(image)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
