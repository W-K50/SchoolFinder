import { DeletePhoto, GetGalleryImage } from "@/Config/Urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ImageGallery = ({ images, deletebtn }) => {
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
        {!deletebtn && (
          <img
            src={GetGalleryImage(AuthState?.id, imageState)}
            class={"w-full md:w-1/2 md:h-96 rounded-lg"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
            }}
          />
        )}
      </div>
      <div class="flex flex-wrap">
        {images?.map((image, index) => {
          return (
            <div class=" mr-2 mt-2" key={index}>
              {deletebtn && (
                <div class="bg-gray-200 flex items-center justify-center absolute rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              )}
              <img
                src={GetGalleryImage(AuthState?.id, image)}
                width={"150px"}
                class={`rounded-lg border-4 border-transparent hover:cursor-pointer ${
                  deletebtn ? "hover:border-red-500" : "hover:border-blue-500"
                } `}
                onClick={async () => {
                  if (!deletebtn) {
                    setImageState(image);
                  } else {
                    await axios
                      .post(DeletePhoto, {
                        authprofileID: AuthState?.id,
                        schoolProfileID: AuthState?.SchoolProfile.id,
                        photoUrl: image,
                        purpose: "gallery",
                      })
                      .then((resp) => {
                        console.log(resp.data);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
