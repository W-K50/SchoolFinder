import { GetCoverImage, recommandSystemValue } from "@/Config/Urls";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cards = ({ profile, onClick }) => {
  const router = useRouter();
  const [recValue, setRecValue] = useState([]);

  const getRecommandValue = async (authID) => {
    await axios
      .get(recommandSystemValue, {
        authID: authID,
      })
      .then((resp) => {
        // console.log(resp.data.response);
        setRecValue(resp.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRecommandValue();
  }, []);

  return (
    <>
      <div
        class="rounded-xl overflow-hidden shadow-lg flex flex-col w-72 hover:cursor-pointer mb-10 mr-3"
        onClick={onClick}
      >
        <div class="relative">
          <img
            class="w-full h-72"
            src={GetCoverImage(profile.AuthId, profile.coverimgURL)}
            alt="Sunset in the mountains"
          />
          <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>

          <div class="text-xs absolute top-0 right-0  px-4 py-2 text-white mt-3 mr-3 hover:text-indigo-600 transition duration-500 ease-in-out">
            <h5 class="mb-2 text-lg font-normal tracking-tight  text-white p-2 bg-blue-500 rounded-md flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {recValue.map((rec) => {
                if (rec.id === profile.AuthId) {
                  return rec.recommandedSystem;
                }
              })}
            </h5>
          </div>
        </div>
        <div class="px-6 py-4 mb-auto">
          <a class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out  mb-2">
            {profile.schoolname}
          </a>
          {/* <p class="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}
        </div>
        {/* <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <span class="ml-1">6 mins ago</span>
          </span>

          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              class="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
            <span class="ml-1">39 Comments</span>
          </span>
        </div> */}
      </div>
    </>
  );
};

export default Cards;
