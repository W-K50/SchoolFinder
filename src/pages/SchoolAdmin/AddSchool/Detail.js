import ImageGallery from "@/components/ImageGallery";
import Locations from "@/components/Locations";
import React from "react";

const Detail = () => {
  const DetailText = ({ label, labelText }) => {
    return (
      <div>
        <p class="text-xl text-gray-400 dark:text-white">{label}</p>
        <p class="text-2xl text-gray-100 dark:text-white">{labelText}</p>
      </div>
    );
  };

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <div class="min-h-screen pb-10">
      <div>
        <div class="h-80 w-full bg-slate-500 overflow-hidden ">
          <img
            class=" rounded-lg shadow-xl dark:shadow-gray-800 object-center w-screen"
            src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
            alt="image description"
          />
        </div>
        <div class="container mx-5 md:mx-auto">
          <div class="relative">
            <div class="w-36 h-36 rounded-full overflow-hidden absolute -top-20">
              <img
                class="align-middle w-36 h-36"
                src="https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container  px-5 md:mx-auto bg-transparent backdrop-blur-md text-white p-10 border-2 border-gray-600 rounded-xl mt-14">
        <div class="w-full flex flex-col">
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-5xl dark:text-white">
            Your <span class="text-yellow-400 dark:text-blue-500">School</span>{" "}
            Profile.
          </h1>
          <button
            type="button"
            class="self-end flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DetailText
            label={"School Name"}
            labelText={
              "Mehraj Hassan Public High School Mehraj Hassan Public High."
            }
          />
          <DetailText label={"Email"} labelText={"bitc322@gmail.com"} />
          <DetailText label={"Mobile"} labelText={"03404960397"} />
          <DetailText label={"Website"} labelText={"http://www.google.com"} />
          <div class="col-span-1 md:col-span-2">
            <DetailText
              label={"School Intro"}
              labelText={"Mehraj Hassan Public High School."}
            />
          </div>
          <DetailText label={"Academic"} labelText={"Medical"} />
          <DetailText label={"Curriculum"} labelText={"Punjab Text Book"} />
          <DetailText label={"City"} labelText={"Khewra"} />
          <DetailText label={"Address"} labelText={"Khewra Punjab Pakistan"} />
          <DetailText label={"School Code"} labelText={"78541"} />
          <DetailText
            label={"Facebook URL"}
            labelText={"http://www.facebook.com"}
          />
          <DetailText
            label={"Download URL"}
            labelText={"http://www.google.com"}
          />
        </div>
        <h5 class="text-2xl font-normal dark:text-white py-5">Gallery</h5>

        <div class="col-span-1 md:col-span-2">
          <ImageGallery images={images} />
        </div>

        <h5 class="text-2xl font-normal dark:text-white py-5">Location</h5>
        <Locations />
      </div>
      <div class="w-full flex flex-col items-center my-5">
        <button
          type="button"
          class=" flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Delete School Profile
        </button>
      </div>
    </div>
  );
};

export default Detail;
