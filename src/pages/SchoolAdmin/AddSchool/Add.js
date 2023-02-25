import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CoverPhotoUrl, LogoPhotoUrl } from "../../../Config/Urls.js";

const Add = () => {
  const [schoolname, setschoolname] = useState("");
  const [schoolIntro, setschoolIntro] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [websiteURL, setwebsiteURL] = useState("");
  const [academic, setacademic] = useState("");
  const [curriculum, setcurriculum] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [schoolCode, setschoolCode] = useState("");
  const [FacebookURL, setFacebookURL] = useState("");
  const [downloadURL, setdownloadURL] = useState("");
  const [logoURL, setlogoURL] = useState("");
  const [coverimgURL, setcoverimgURL] = useState("");

  // Cover Photo
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  //   Logo Photo
  const [selectedLogoFile, setSelectedLogoFile] = useState();
  const [previewLogo, setPreviewLogo] = useState();

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Progress
  const [progress, setProgress] = useState(0);
  const [isProgressBar, setIsProgressBar] = useState(false);

  // cover photo ref
  const inputRef = useRef();
  const LogoinputRef = useRef();

  //   For Cover Photo
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e, option) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    UploadCoverPhoto(e.target.files[0]);
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  //   Upload Cover Photo
  const config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setIsProgressBar(true);
      setProgress(percentCompleted);
    },
  };

  const UploadCoverPhoto = async (file) => {
    let formData = new FormData();

    formData.append("CoverImage", file);
    formData.append("authprofileID", "123456");
    formData.append("schoolProfileID", "123");
    return axios
      .post(CoverPhotoUrl, formData, config)
      .then((resp) => {
        console.log(resp.data);
        setIsProgressBar(false);
      })
      .catch((error) => {
        console.log(error);
        setIsProgressBar(false);
      });
  };

  //   For Logo Photo
  useEffect(() => {
    if (!selectedLogoFile) {
      setPreviewLogo(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedLogoFile);
    setPreviewLogo(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedLogoFile]);

  const onSelectLogoFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedLogoFile(undefined);
      return;
    }
    UploadLogoPhoto(e.target.files[0]);
    // I've kept this example simple by using the first image instead of multiple
    setSelectedLogoFile(e.target.files[0]);
  };

  //   Upload Logo Photo
  //   const config = {
  //     onUploadProgress: (progressEvent) => {
  //       var percentCompleted = Math.round(
  //         (progressEvent.loaded * 100) / progressEvent.total
  //       );
  //       setIsProgressBar(true);
  //       setProgress(percentCompleted);
  //     },
  //   };

  const UploadLogoPhoto = async (file) => {
    let formData = new FormData();

    formData.append("SchoolLogo", file);
    formData.append("authprofileID", "123456");
    formData.append("schoolProfileID", "123");
    return axios
      .post(LogoPhotoUrl, formData, config)
      .then((resp) => {
        console.log(resp.data);
        setIsProgressBar(false);
      })
      .catch((error) => {
        console.log(error);
        setIsProgressBar(false);
      });
  };

  const submitProfile = () => {};
  return (
    <div class=" bg-fixed min-h-screen pb-10 ">
      <div>
        <div class="h-80 w-full bg-slate-500 overflow-hidden relative">
          <div class="absolute w-full h-full flex items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <p
              class="text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-400 ml-2 cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Change your cover photo
            </p>
            <input
              type={"file"}
              ref={inputRef}
              hidden
              onChange={(event) => onSelectFile(event, "cover")}
            />
          </div>
          {isProgressBar && (
            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {progress} %
              </div>
            </div>
          )}
          <img
            class=" rounded-lg shadow-xl dark:shadow-gray-800 object-center w-screen"
            src={
              preview ||
              "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
            }
            alt="image description"
          />
        </div>

        <div class="container mx-5 md:mx-auto">
          <div class="relative">
            <div class="w-36 h-36 rounded-full overflow-hidden absolute -top-20">
              <div class="absolute w-full h-full flex items-center justify-center">
                <div
                  class=" p-3 rounded-full bg-transparent backdrop-blur-sm border-2 border-gray-400 cursor-pointer hover:backdrop-blur-md"
                  onClick={() => LogoinputRef.current.click()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
              <img
                class="align-middle w-36 h-36 "
                src={
                  previewLogo ||
                  "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80"
                }
              />
              <input
                type={"file"}
                ref={LogoinputRef}
                hidden
                onChange={(event) => onSelectLogoFile(event)}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container px-5 md:mx-auto bg-transparent backdrop-blur-md text-white p-10 border-2 border-gray-600 rounded-xl mt-14">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-100 md:text-5xl lg:text-5xl dark:text-white">
          Add <span class="text-yellow-400 dark:text-blue-500">School</span>{" "}
          Profile.
        </h1>
        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="School_name"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                School Name
              </label>
              <input
                type="text"
                id="School_name"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="School"
                required
                onChange={(event) => setschoolname(event.target.value)}
                value={schoolname}
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
                onChange={(event) => setemail(event.target.value)}
                value={email}
              />
            </div>
            <div class="col-span-2">
              <label
                for="intro"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Intro about your school
              </label>
              <textarea
                id="intro"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your intro here..."
                onChange={(event) => setschoolIntro(event.target.value)}
                value={schoolIntro}
              ></textarea>
            </div>

            <div>
              <label
                for="mobile"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Mobile #
              </label>
              <input
                type="text"
                id="mobile"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="phone"
                required
                onChange={(event) => setmobile(event.target.value)}
                value={mobile}
              />
            </div>
            <div>
              <label
                for="web"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Website URL
              </label>
              <input
                type="text"
                id="web"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="web"
                required
                onChange={(event) => setwebsiteURL(event.target.value)}
                value={websiteURL}
              />
            </div>

            <div>
              <label
                for="curriculum"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Academic
              </label>
              <input
                type="text"
                id="curriculum"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="curriculum"
                required
                onChange={(event) => setacademic(event.target.value)}
                value={academic}
              />
            </div>
            <div>
              <label
                for="curriculum"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Curriculum
              </label>
              <input
                type="text"
                id="curriculum"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="curriculum"
                required
                onChange={(event) => setcurriculum(event.target.value)}
                value={curriculum}
              />
            </div>
            <div>
              <label
                for="city"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="city"
                required
                onChange={(event) => setcity(event.target.value)}
                value={city}
              />
            </div>
            <div>
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="address"
                required
                onChange={(event) => setaddress(event.target.value)}
                value={address}
              />
            </div>
            <div>
              <label
                for="school_code"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                School Code
              </label>
              <input
                type="text"
                id="school_code"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="School Code"
                required
                onChange={(event) => setschoolCode(event.target.value)}
                value={schoolCode}
              />
            </div>
            <div>
              <label
                for="fb_url"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Facebook URL
              </label>
              <input
                type="text"
                id="fb_url"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="FB URL"
                required
                onChange={(event) => setFacebookURL(event.target.value)}
                value={FacebookURL}
              />
            </div>
            <div>
              <label
                for="proposal_download_url"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Perposal Download URL
              </label>
              <input
                type="text"
                id="proposal_download_url"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Perposal Download"
                required
                onChange={(event) => setdownloadURL(event.target.value)}
                value={downloadURL}
              />
            </div>
          </div>

          <div class="flex items-start pb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-100 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          {isLoading ? (
            <button
              disabled
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Add;