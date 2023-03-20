import { GetCoverImage } from "@/Config/Urls";
import { useRouter } from "next/router";
import React from "react";

const Cards = ({ profile, onClick }) => {
  const router = useRouter();

  return (
    <div
      onClick={onClick}
      class="w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-3 my-3 hover:border-blue-500 overflow-hidden"
    >
      <a href="#">
        <img
          class="rounded-t-lg hover:scale-105"
          src={GetCoverImage(profile.AuthId, profile.coverimgURL)}
          alt=""
        />
      </a>
      <div class="p-2">
        <a href="#">
          <h5 class="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
            {profile.schoolname}
          </h5>
        </a>
      </div>
    </div>
  );
};

export default Cards;
