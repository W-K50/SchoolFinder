import ImageGallery from "@/components/ImageGallery";
import Locations from "@/components/Locations";
import NavBar from "@/components/NavBar";
import {
  DownloadPerposal,
  GetCoverImage,
  GetLogoImage,
  getProfileData,
} from "@/Config/Urls";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth_Data,
  getSchoolProfile_Data,
} from "@/Store/Auth_State/Auth_Actions";

const Detail = () => {
  const AuthState = useSelector((state) => state.Auth_Reducer.users);
  const SchoolProfileState = useSelector(
    (state) => state.Auth_Reducer.SchoolProfile
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const getProfile = async () => {
    const exploreSchoolID = localStorage.getItem("exploreSchoolID");
    await axios
      .post(getProfileData, {
        authID: exploreSchoolID || SchoolProfileState.AuthId, //AuthState.response?.id
      })
      .then((resp) => {
        console.log(resp.data);
        dispatch(getAuth_Data(resp.data.response));
        dispatch(getSchoolProfile_Data(resp.data.response.SchoolProfile));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  const DetailText = ({ label, labelText, button = false }) => {
    return (
      <div>
        <p class="text-xl text-gray-900  font-medium">{label}</p>
        {button && (
          <div class="flex items-center mt-2">
            <a
              href={DownloadPerposal(
                SchoolProfileState?.AuthId,
                SchoolProfileState?.downloadURL
              )}
              class=" flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <p>Download Perposal</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
            </a>
          </div>
        )}
        <p class="text-xl text-gray-600 dark:text-white mt-2">{labelText}</p>
      </div>
    );
  };

  const [logoImageError, setlogoImageError] = useState(true);
  const [coverImageError, setcoverImageError] = useState(true);

  return (
    <div class="min-h-screen p-2">
      <NavBar />

      <div>
        <div class="h-80 w-full overflow-hidden ">
          <img
            class=" rounded-lg shadow-xl  w-full"
            src={
              coverImageError
                ? GetCoverImage(
                    SchoolProfileState?.AuthId,
                    SchoolProfileState?.coverimgURL
                  )
                : "https://picsum.photos/id/1019/1000/600/"
            }
            alt="image description"
            onError={() => setcoverImageError(false)}
          />
        </div>
        <div class="container mx-5 md:mx-auto">
          <div class="relative">
            <div class="w-36 h-36 rounded-full overflow-hidden absolute -top-20">
              <img
                class="align-middle w-36 h-36"
                src={
                  logoImageError
                    ? GetLogoImage(
                        SchoolProfileState?.AuthId,
                        SchoolProfileState?.logoURL
                      )
                    : "https://picsum.photos/id/1019/1000/600/"
                }
                onError={() => setlogoImageError(false)}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container px-5 md:mx-auto bg-transparent backdrop-blur-md text-white p-10 border-2 border-gray-600 rounded-xl mt-14">
        <div class="w-full flex flex-col">
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
            <span class="text-yellow-400 dark:text-blue-500">School</span>{" "}
            Profile.
          </h1>
        </div>
        'dm\'
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DetailText
            label={"School Name"}
            labelText={SchoolProfileState?.schoolname || "-"}
          />
          <DetailText
            label={"Email"}
            labelText={SchoolProfileState?.email || "-"}
          />
          <DetailText
            label={"Mobile"}
            labelText={SchoolProfileState?.mobile || "-"}
          />
          <DetailText
            label={"Website"}
            labelText={SchoolProfileState?.websiteURL || "-"}
          />
          <div class="col-span-1 md:col-span-2">
            <DetailText
              label={"School Intro"}
              labelText={SchoolProfileState?.schoolIntro || "-"}
            />
          </div>
          <DetailText
            label={"Academic"}
            labelText={
              SchoolProfileState?.academic.map((ace) => `${ace} /`) || "-"
            }
          />
          <DetailText
            label={"Curriculum"}
            labelText={SchoolProfileState?.curriculum || "-"}
          />
          <DetailText
            label={"Mobile"}
            labelText={SchoolProfileState?.mobile || "-"}
          />
          <DetailText
            label={"Area"}
            labelText={SchoolProfileState?.area || "-"}
          />
          <DetailText
            label={"City"}
            labelText={SchoolProfileState?.city || "-"}
          />
          <DetailText
            label={"Address"}
            labelText={SchoolProfileState?.address || "-"}
          />
          <DetailText
            label={"School Code"}
            labelText={SchoolProfileState?.schoolCode || "-"}
          />
          <DetailText
            label={"Facebook URL"}
            labelText={SchoolProfileState?.FacebookURL || "-"}
          />
          <DetailText
            label={"Proposal URL"}
            button={true}
            // labelText={SchoolProfileState?.downloadURL || "-"}
          />
        </div>
        <h5 class="text-2xl font-normal dark:text-white py-5">Gallery</h5>
        <div class="col-span-1 md:col-span-2">
          <ImageGallery images={AuthState.SchoolProfile?.galleryImages} />
        </div>
        <h5 class="text-2xl font-normal dark:text-white py-5">Location</h5>
        <Locations
          setUploadLocation={() => {}}
          SchoolLocation={AuthState.SchoolProfile?.location}
        />
      </div>
    </div>
  );
};

export default Detail;
