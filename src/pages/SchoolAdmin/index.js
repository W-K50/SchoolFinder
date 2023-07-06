import WarningAlert from "@/components/Alerts/WarningAlert";
import ImageGallery from "@/components/ImageGallery";
import Locations from "@/components/Locations";
import NavBar from "@/components/NavBar";
import {
  DownloadPerposal,
  GetCoverImage,
  GetLogoImage,
  SendEmailVerification,
  getProfileData,
} from "@/Config/Urls";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth_Data } from "@/Store/Auth_State/Auth_Actions";

const Detail = () => {
  const AuthState = useSelector((state) => state.Auth_Reducer.users);
  const SchoolProfileState = useSelector(
    (state) => state.Auth_Reducer.users.SchoolProfile
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const AuthID = localStorage.getItem("AuthID");
    if (AuthID !== null) {
      return;
    } else {
      router.replace("/Auth");
    }
  }, []);

  const getProfile = async () => {
    const AuthID = localStorage.getItem("AuthID");
    await axios
      .post(
        getProfileData,
        {
          authID: AuthID || AuthState?.id, //AuthState.response?.id
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log(resp.data);
        dispatch(getAuth_Data(resp.data.response));
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
        <p class="text-xl text-gray-900 font-medium">{label}</p>
        {button && (
          <div class="flex items-center mt-2">
            <a
              href={DownloadPerposal(
                AuthState?.id,
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

  const [isEmailVerified, setEmailVerified] = useState(true);
  // console.log(AuthState.emailVerified);`
  return (
    <div class="min-h-screen p-2">
      {AuthState.emailVerified === "false" ? (
        <WarningAlert
          message={"Check your email for Verification"}
          button
          btnOnPress={async () => {
            await axios
              .post(SendEmailVerification, {
                TargetEmail: AuthState.email, //
                authID: AuthState.id,
              })
              .then((resp) => {
                console.log("Email Sended");
                console.log(resp.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          onClick={() => {}}
        />
      ) : null}
      <NavBar school={true} />

      <div>
        <div class="h-80 w-full overflow-hidden rounded-md ">
          <img
            class=" rounded-lg shadow-xl dark:shadow-gray-800 w-full"
            src={
              coverImageError
                ? GetCoverImage(AuthState.id, SchoolProfileState?.coverimgURL)
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
                    ? GetLogoImage(AuthState?.id, SchoolProfileState?.logoURL)
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
            Your <span class="text-yellow-400 dark:text-blue-500">School</span>{" "}
            Profile.
          </h1>
          <button
            type="button"
            class="self-end flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              if (SchoolProfileState == null) {
                router.push("/SchoolAdmin/AddSchool/Add");
              } else {
                router.push("/SchoolAdmin/AddSchool/Edit");
              }
            }}
          >
            {SchoolProfileState == null ? (
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
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
            )}

            {SchoolProfileState == null ? "Add School" : "Edit School"}
          </button>
        </div>
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
            label={"City"}
            labelText={SchoolProfileState?.city || "-"}
          />
          <DetailText
            label={"Area"}
            labelText={SchoolProfileState?.area || "-"}
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
          <ImageGallery
            images={AuthState.SchoolProfile?.galleryImages}
            deletebtn={false}
          />
        </div>

        <h5 class="text-2xl font-normal dark:text-white py-5">Location</h5>
        {/* <Locations
          setUploadLocation={() => {}}
          SchoolLocation={AuthState.SchoolProfile?.location}
        /> */}
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
