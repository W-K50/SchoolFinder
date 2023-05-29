import ErrorAlert from "@/components/Alerts/ErrorAlert.js";
import SuccessAlert from "@/components/Alerts/SuccessAlert.js";
import Locations from "@/components/Locations.js";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  AddSchoolProfile,
  DeletePhoto,
  getGalleryImage,
  PhotoUpload,
} from "../../../Config/Urls.js";
import { useRouter } from "next/router.js";

const Add = () => {
  const AuthState = useSelector((state) => state.Auth_Reducer.users);

  const router = useRouter();

  useEffect(() => {
    const AuthID = localStorage.getItem("AuthID");
    if (AuthID !== null) {
      return;
    } else {
      router.replace("/Auth");
    }
  }, []);

  const [schoolname, setschoolname] = useState("");
  const [schoolIntro, setschoolIntro] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [websiteURL, setwebsiteURL] = useState("");
  const [academic, setacademic] = useState("");
  const [area, setarea] = useState("");
  const [curriculum, setcurriculum] = useState("");
  const [city, setcity] = useState("Abbottabad");
  const [location, setLocation] = useState("");
  const [address, setaddress] = useState("");
  const [schoolCode, setschoolCode] = useState("");
  // Social Links
  const [FacebookURL, setFacebookURL] = useState("");
  const [downloadURL, setdownloadURL] = useState("");
  // IMage URLs
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

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    UploadCoverPhoto(e.target.files[0], "coverphoto");
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

  const UploadCoverPhoto = async (image, purpose) => {
    let formData = new FormData();
    formData.append("UploadPhoto", image);
    formData.append("authuploadID", "123456");
    formData.append("schoolProfileID", "123");
    formData.append("purpose", purpose);
    return axios
      .post(PhotoUpload, formData, config)
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
    UploadLogoPhoto(e.target.files[0], "logo");
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

  const UploadLogoPhoto = async (image, purpose) => {
    let formData = new FormData();

    formData.append("UploadPhoto", image);
    formData.append("authuploadID", "123456");
    formData.append("schoolProfileID", "123");
    formData.append("purpose", purpose);
    return axios
      .post(PhotoUpload, formData, config)
      .then((resp) => {
        console.log(resp.data);
        setIsProgressBar(false);
      })
      .catch((error) => {
        console.log(error);
        setIsProgressBar(false);
      });
  };

  // Get Gallery IMages
  const galleryRef = useRef();
  const [Images, AddImages] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [UploadedImages, setUploadedImages] = useState(false);

  // GalleryPhotoUpload
  const [progressComp, setprogressComp] = useState(false);
  const [galleryprogress, setgalleryProgress] = useState(false);

  const Galleryconfig = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setprogressComp(true);
      setgalleryProgress(percentCompleted);
    },
  };

  const UploadPhoto = async (image, purpose, previewImage) => {
    let formData = new FormData();

    formData.append("UploadPhoto", image);
    formData.append("authuploadID", "123456");
    formData.append("schoolProfileID", "123");
    formData.append("purpose", purpose);
    return axios
      .post(PhotoUpload, formData, Galleryconfig)
      .then((resp) => {
        console.log(resp.data);
        AddImages([...Images, resp.data?.path]); // http://localhost:5000/Images/123456/SchoolGallery/123_andy-vult-bs4qtd2NsGI-unsplash.jpg
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SelectGalleryImages = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const previewImage = URL.createObjectURL(e.target.files[0]);
    setUploadedImages(true);
    setPreviewImage(previewImage);
    UploadPhoto(e.target.files[0], "gallery", previewImage).then((resp) => {
      setUploadedImages(false);
    });
  };

  const submitProfile = async () => {
    // console.log(
    //   schoolname,
    //   schoolIntro,
    //   email,
    //   mobile,
    //   websiteURL,
    //   academic,
    //   area,
    //   curriculum,
    //   city,
    //   location,
    //   address,
    //   schoolCode,
    //   FacebookURL,
    //   AuthState?.id || localStorage.getItem("AuthID")
    // );
    await axios
      .post(AddSchoolProfile, {
        schoolname: schoolname,
        schoolIntro: schoolIntro,
        email: email,
        mobile: mobile,
        websiteURL: websiteURL,
        academic: academic,
        curriculum: curriculum,
        area: area,
        city: city,
        location: location,
        address: address,
        schoolCode: schoolCode,
        FacebookURL: FacebookURL,
        AuthId: AuthState?.id || localStorage.getItem("AuthID"),
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Academic = [
    "Kindergarden",
    "Montessori",
    "Pre-Primary",
    "Primary",
    "Secondary",
    "Cambridge system",
  ];

  const [acadDropDown, setAcadDropDown] = useState(false);
  const [areaDropDown, setAreaDropDown] = useState(false);

  const [acadmicArray, setAcadmicArray] = useState([]); // Select array Academic
  const [areaArray, setAreaArray] = useState(""); // Select Area

  const area_name = [
    "Phul Gulab Road",
    "Bagnotar",
    "Bakote",
    "Dhamtour",
    "Hajia gali",
    "Havelian village",
    "Jhangi",
    "Kakul",
    "Kunj",
    "Lora",
    "Mirpur",
    "Pind Kargu khan",
    "Sajikot",
    "Salhad",
    "Sheikh ul bandi",
    "Sherwan",
    "Samunder katha",
    "Havelian",
    "Malik pura",
    "Nawanshehr",
    "Rajoya",
    "Malkot",
    "Qalabdarabaad",
    "Batala",
    "Bandi Attai khan",
    "Kuthiala",
    "Halmaira",
    "Bagan",
    "Bagh",
    "Banda pir khan",
    "Bandi Dhundan",
    "Bodla",
    "Boi",
    "Bhuraj",
    "Chamhad",
    "Chamhatti",
    "Chamiali",
    "Maira",
    "Dalola",
    "Garhi noor pur",
    "Ghambir",
    "Ghora bazgran",
    "Hadora",
    "Harno aziz abad",
    "Jarral",
    "Jhangra",
    "Kanthiyali",
    "Khaira gali",
    "Muslimabad",
    "Mandiyan",
    "Kaala pull",
    "Supply",
    "Cantt",
    "Bilal town",
    "Phalkot",
    "Link road",
    "Chinnar road",
    "Neelay pair",
    "Mansehra road",
    "Jinnahabad",
    "Kalabagh",
    "Noorpur",
    "Aliabad",
    "Phullan",
    "Jabrian",
    "Shimla",
    "Sultanpur",
    "Birote",
    "Choona kari",
    "Karim pura",
    "Jhafar",
    "Langrial",
    "Malkan",
    "Industry road",
    "College road",
    "Sarban chowck",
    "Fawara chowck",
    "Ghora chowck",
    "Missile chowck",
    "Lodhiabad",
    "Upper kehal",
    "Murre road",
    "PMA road",
    "Javed shaheed road",
    "Habibullah colony",
    "Kaghan colony",
  ];

  return (
    <div class=" bg-fixed min-h-screen pb-10 ">
      <div class={"sticky top-0 z-50"}>
        {successAlert && (
          <SuccessAlert onClick={() => setSuccessAlert(false)} />
        )}
      </div>
      <div class={"sticky top-0 z-50"}>
        {errorAlert && <ErrorAlert onClick={() => setErrorAlert(false)} />}
      </div>
      <div>
        <div class="h-80 w-full bg-slate-500 overflow-hidden relative">
          {/* <div class="absolute w-full h-full flex items-center justify-center ">
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
              class="text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-400 ml-2 cursor-pointer hover:text-gray-400"
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
              accept="image/png, image/jpeg"
            />
          </div> */}
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
                {/* <div
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
                </div> */}
              </div>
              <img
                class="align-middle w-36 h-36 "
                src={
                  previewLogo ||
                  "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80"
                }
              />
              {/* <input
                type={"file"}
                ref={LogoinputRef}
                hidden
                onChange={(event) => onSelectLogoFile(event)}
                accept="image/png, image/jpeg"
              /> */}
            </div>
          </div>
        </div>
      </div>

      <div class="container px-5 md:mx-auto bg-transparent backdrop-blur-md text-white p-10 border-2 border-gray-600 rounded-xl mt-14">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
          Add <span class="text-yellow-400 dark:text-blue-500">School</span>{" "}
          Profile.
        </h1>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="School_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              School Name
            </label>
            <input
              type="text"
              id="School_name"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="School"
              required
              onChange={(event) => setschoolname(event.target.value)}
              value={schoolname}
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
              onChange={(event) => setemail(event.target.value)}
              value={email}
            />
          </div>
          <div class="col-span-2">
            <label
              for="intro"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Intro about your school
            </label>
            <textarea
              id="intro"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your intro here..."
              onChange={(event) => setschoolIntro(event.target.value)}
              value={schoolIntro}
            ></textarea>
          </div>

          <div>
            <label
              for="mobile"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mobile #
            </label>
            <input
              type="number"
              id="mobile"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="phone"
              required
              onChange={(event) => setmobile(event.target.value)}
              value={mobile}
            />
          </div>
          <div>
            <label
              for="web"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Website URL
            </label>
            <input
              type="text"
              id="web"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="web"
              required
              onChange={(event) => setwebsiteURL(event.target.value)}
              value={websiteURL}
            />
          </div>

          <div>
            <label
              for="academic"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Academic
            </label>
            <button
              id="dropdownDelayButton"
              data-dropdown-toggle="dropdownDelay"
              data-dropdown-delay="500"
              data-dropdown-trigger="hover"
              class="w-full justify-between text-gray-900 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() =>
                setAcadDropDown((oldState) => setAcadDropDown(!oldState))
              }
            >
              Choose Academic
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              id="dropdownDelay"
              class={` z-10  ${
                acadDropDown ? "block" : "hidden"
              }  bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700`}
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDelayButton"
              >
                {Academic.map((acad, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setAcadmicArray([...acadmicArray, acad]);
                        setacademic([...acadmicArray, acad]);
                      }}
                      className="hover: cursor-pointer"
                    >
                      <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {acad}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-wrap">
              {acadmicArray.map((acadlist, index) => {
                return (
                  <div
                    key={index}
                    className="text-gray-900 bg-blue-300 p-1 m-1 rounded-md flex items-center"
                  >
                    <p>{acadlist}</p>
                    <div
                      className="ml-2 cursor-pointer "
                      onClick={() => {
                        setAcadmicArray(
                          acadmicArray.filter((acadm) => acadm !== acadlist)
                        );
                      }}
                    >
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAmxJREFUSEt9VouRqzAMXFXyoJIjlVxSCaQS0gmkktCJ3qwkGxnIeeYOh8j67K7kCOoSCBQqQPwD8t7s7EV9b/a7g9iFn/rpZJAcJaNz4HwwB24P8Zua2GUsYADwA3/ybwOw8inAW32fVgQLx5I/HuDqFJgBGa6hqHkx4C0Cn7L9EgAjgCkgp4MXBG+oZdtFJf8A3ONzsXlWigpSewV1NwIyGZkMAnnmCg4a6FTwC6WdLT6fR8AyB8zuEwYs+4DvV7oGARZ1fh4CrEVdTvK+lij/JcAjGTHT7aDJToAtyXSEYILKJtD+KgDxnGGOpE+wzAIMKrhBLUOuDpBZoKsKDPfgwkQB6A2CtfBR6i7ETtCKIyFjVXxugNwi8FwlK+hT743BR+Uiq4iHWMXDVLMvQkF8I4hVUfqhd7PaaAPUElrhFds3ZZHcDp4Rmygqtx3fL1ALwsUg4Tx5EHRQfIKbnu7PAfxgwbpkR8e56Q7NldUlGqmZ7zwqioJ2ebroO0BJPsv3wJ5pClLrdaE4xIS6CTAKMKlL7Zmm5gJoxrwl3rCWLbI2oZgfa7gCkSdAJ6xix9ff89A9uCmcdlBZTKaWaR31C9RkWoWSOAgoXCG1xGPvpuFYVFVYLipk9xNmA8hlup+iWj58IdCHCl61e9sp3BwK2bJ6rmbENKMigt2hRhTXaXglUZatN2iyP16KLQqukN90qFwwbzZQHKYNLyFyw/3XZM73QYbLJUdO2tXekKee2I2bRru8V5kdRwVvt58YZKyYk5VkWlVF780PgCg1VXBiMRJpfyVccPDnpd5AtJNzUU0N18yo09uaQLj4DxsSFS8XFs6VAAAAAElFTkSuQmCC" />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <input
              type="text"
              id="academic"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Academic"
              required
              onChange={(event) => setacademic(event.target.value)}
              value={academic}
            /> */}
          </div>

          <div>
            <label
              for="curriculum"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Curriculum
            </label>
            <input
              type="text"
              id="curriculum"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="curriculum"
              required
              onChange={(event) => setcurriculum(event.target.value)}
              value={curriculum}
            />
          </div>
          <div>
            <label
              for="Area"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Area
            </label>
            <button
              id="dropdownDelayButton"
              data-dropdown-toggle="dropdownDelay"
              data-dropdown-delay="500"
              data-dropdown-trigger="hover"
              class="w-full justify-between  text-gray-900 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() =>
                setAreaDropDown((oldState) => setAreaDropDown(!oldState))
              }
            >
              {areaArray ? areaArray : "Choose Area"}
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              id="dropdownDelay"
              class={` z-10 max-h-48 overflow-y-scroll ${
                areaDropDown ? "block absolute" : "hidden"
              }  bg-white divide-y divide-gray-100 rounded-lg shadow w-96 dark:bg-gray-700`}
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDelayButton"
              >
                {area_name.map((area, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setAreaArray(area);
                        setarea(area);
                      }}
                      className="hover: cursor-pointer"
                    >
                      <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {area}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <input
              type="text"
              id="Area"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Area"
              required
              // onChange={(event) => setcurriculum(event.target.value)}
              // value={curriculum}
            /> */}
          </div>
          <div>
            <label
              for="city"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="city"
              required
              // onChange={(event) => setcity(event.target.value)}
              value={city}
            />
          </div>
          <div>
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="address"
              required
              onChange={(event) => setaddress(event.target.value)}
              value={address}
            />
          </div>
          <div>
            <label
              for="school_code"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              School Code
            </label>
            <input
              type="text"
              id="school_code"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="School Code"
              required
              onChange={(event) => setschoolCode(event.target.value)}
              value={schoolCode}
            />
          </div>
          <div>
            <label
              for="fb_url"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Facebook URL
            </label>
            <input
              type="text"
              id="fb_url"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="FB URL"
              required
              onChange={(event) => setFacebookURL(event.target.value)}
              value={FacebookURL}
            />
          </div>
          {/* <div>
              <label
                for="proposal_download_url"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Perposal Download URL
              </label>
              <input
                type="file"
                id="proposal_download_url"
                class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Perposal Download"
                required
                onChange={(event) => setdownloadURL(event.target.value)}
                value={downloadURL}
              />
            </div> */}

          {/* <h5 class="col-span-2 md:col-span-2 text-2xl font-normal dark:text-white py-5">
              Add Gallery Images
            </h5>
            <div class="md:col-span-2 flex items-center">
              {Images.map((image, index) => {
                return (
                  <div
                    key={index.toString()}
                    className="mr-2 hover:cursor-pointer relative"
                    onClick={async () => {
                      await axios
                        .post(DeletePhoto, {
                          authprofileID: "123456",
                          schoolProfileID: "123",
                          photoUrl: image,
                          purpose: "gallery",
                        })
                        .then((resp) => {
                          console.log(resp.data);
                          let deleteImage = Images.filter(
                            (img) => img !== image
                          );
                          AddImages(deleteImage);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <div class="w-full h-full rounded-lg absolute flex items-center justify-center">
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                    <div class="w-full h-full bg-red-600 opacity-0 hover:opacity-20 rounded-lg absolute"></div>
                    <img
                      src={getGalleryImage("123456", image)}
                      width={"150px"}
                      class={"rounded-lg max-h-24"}
                    />
                  </div>
                );
              })}

              {UploadedImages && (
                <div className="mr-2 hover:cursor-pointer relative">
                  <img
                    src={previewImage}
                    width={"150px"}
                    class={"rounded-lg max-h-24"}
                  />

                  <div class="w-full h-2 rounded-lg pt-2">
                    <div
                      class="bg-blue-500 h-1 rounded-lg"
                      style={{ width: `${galleryprogress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div
                class="w-28 h-14 bg-slate-600 rounded-lg flex items-center justify-center hover:cursor-pointer hover:bg-slate-700"
                onClick={() => galleryRef.current.click()}
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                ref={galleryRef}
                type="file"
                class="hidden"
                onChange={(e) => SelectGalleryImages(e)}
                accept="image/png, image/jpeg"
              />
            </div> */}
        </div>
        <h5 class="text-2xl font-normal dark:text-white py-5">Location</h5>
        <Locations setUploadLocation={setLocation} SchoolLocation={""} />

        <div class="flex items-start py-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
            onClick={() => {
              setIsLoading(true);
              submitProfile()
                .then(() => {
                  setIsLoading(false);
                  setSuccessAlert(true);
                  setErrorAlert(false);
                })
                .catch((error) => {
                  console.log(error);
                  setSuccessAlert(false);
                  setErrorAlert(true);
                });
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Add;
