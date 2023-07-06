import {
  GetAllProfiles,
  recommandSystem,
  recommandSystemValue,
} from "@/Config/Urls";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth_Data,
  getSchoolProfile_Data,
} from "@/Store/Auth_State/Auth_Actions";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import CardSkeleton from "./SkeletonLoading/CardSkeleton";

const CardComponent = ({ clickToSearch }) => {
  const AuthState = useSelector((state) => state.Auth_Reducer.user);
  const SchoolProfileState = useSelector(
    (state) => state.Auth_Reducer.SchoolProfile
  );
  const [AllProfile, setAllProfile] = useState([]);
  const [CopyAllProfile, setCopyAllProfile] = useState([]);

  const dispatch = useDispatch();

  const router = useRouter();
  const [searchName, setSearchName] = useState("");

  const [isCardLoading, setIsCardLoading] = useState(false);

  const [searchbyArea, setSearchByArea] = useState(false);
  const [searchbyAcademic, setSearchByAcademic] = useState(false);

  const [searchby, setSearchBy] = useState("name");

  const [searchPlaceholder, setsearchPlaceholder] = useState("School Name");

  const [acadDropDown, setAcadDropDown] = useState(false);
  const [acadmicArray, setAcadmicArray] = useState([]); // Select array Academic

  const Academic = [
    "Kindergarden",
    "Montessori",
    "Pre-Primary",
    "Primary",
    "Secondary",
    "Cambridge system",
  ];

  // useEffect(() => {
  //   if (searchbyArea !== true && searchbyAcademic !== true) {
  //     console.log("Search by Name");
  //     if (searchName !== "") {
  //       const newSearchSchool = CopyAllProfile.filter((profile) => {
  //         const SchoolName = profile.schoolname?.toLowerCase();
  //         const searchText = searchName?.toLowerCase();
  //         if (SchoolName.includes(searchText)) {
  //           return profile;
  //         }
  //       });
  //       setCopyAllProfile(newSearchSchool);
  //     } else {
  //       setCopyAllProfile(AllProfile);
  //     }
  //   } else if (searchbyArea === true || searchbyAcademic !== true) {
  //     console.log("Search by Area");
  //     if (searchName !== "") {
  //       const newArea = CopyAllProfile.filter((profile) => {
  //         const SchoolArea = profile.area?.toLowerCase();
  //         const searchText = searchName?.toLowerCase();
  //         if (SchoolArea.includes(searchText)) {
  //           return profile;
  //         } else {
  //           setCopyAllProfile(profile);
  //         }
  //       });
  //       setCopyAllProfile(newArea);
  //     } else if (searchbyAcademic === true) {
  //       console.log("Search by Academic");
  //       if (searchName !== "") {
  //         const newAcademic = CopyAllProfile.filter((profile) => {
  //           const SchoolAcademic = profile.academic?.toLowerCase();
  //           const searchText = searchName?.toLowerCase();
  //           if (SchoolAcademic.includes(searchText)) {
  //             return profile;
  //           } else {
  //             setCopyAllProfile(profile);
  //           }
  //         });
  //         setCopyAllProfile(newAcademic);
  //       } else {
  //         setCopyAllProfile(AllProfile);
  //       }
  //     } else {
  //     }
  //   }
  // }, [searchName]);

  useEffect(() => {
    if (searchName !== "") {
      switch (searchby) {
        case "area":
          console.log("Search by Area");
          const newArea = CopyAllProfile.filter((profile) => {
            const SchoolArea = profile.area?.toLowerCase();
            const searchText = searchName?.toLowerCase();
            if (SchoolArea.includes(searchText)) {
              return profile;
            } else {
              setCopyAllProfile(profile);
            }
          });
          setCopyAllProfile(newArea);
          break;
        case "academic":
          console.log("Search by Academic");

          const newAcademic = CopyAllProfile.filter((profile) => {
            const constructArray = profile.academic;
            if (constructArray.includes(searchName)) {
              return profile;
            }
          });

          return setCopyAllProfile(newAcademic);
        case "name":
          console.log("Search by Name");

          const newSearchSchool = CopyAllProfile.filter((profile) => {
            const SchoolName = profile.schoolname?.toLowerCase();
            const searchText = searchName?.toLowerCase();
            if (SchoolName.includes(searchText)) {
              return profile;
            }
          });
          setCopyAllProfile(newSearchSchool);
          break;
        default:
          console.log("Default");
          setCopyAllProfile(AllProfile);
          break;
      }
    } else {
      setCopyAllProfile(AllProfile);
    }
  }, [searchName]);

  const getAllProfile = async () => {
    await axios
      .get(GetAllProfiles)
      .then((resp) => {
        // console.log(resp.data);
        setAllProfile(resp.data.message);
        setCopyAllProfile(resp.data.message);
        setIsCardLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsCardLoading(false);
      });
  };
  useEffect(() => {
    setIsCardLoading(true);
    getAllProfile();
  }, []);

  const recommand = async (authID) => {
    await axios
      .post(recommandSystem, {
        authID: authID,
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <SearchBar
        setSearchNameBack={setSearchName}
        searchNameBack={searchName}
        clickToSearch={clickToSearch}
        placeholder={searchPlaceholder}
      />
      <div className="flex items-center justify-center my-5">
        <div
          className={`${
            searchby === "name" ? "bg-blue-700" : "bg-gray-600"
          } px-3 py-2 rounded-full text-white cursor-pointer hover:bg-blue-600 ml-3`}
          onClick={() => {
            setSearchName("");

            setSearchBy("name");
          }}
        >
          Search by Name
        </div>
        <div
          className={`${
            searchby === "area" ? "bg-blue-700" : "bg-gray-600"
          } px-3 py-2 rounded-full text-white cursor-pointer hover:bg-blue-600 ml-3 mr-3`}
          onClick={() => {
            setSearchName("");
            setSearchBy("area");
          }}
        >
          Search by Area
        </div>
        {/* <div
          className={`${
            searchby === "academic" ? "bg-blue-700" : "bg-gray-600"
          } px-3 py-2 rounded-full text-white cursor-pointer hover:bg-blue-600 `}
          onClick={() => {
            setSearchBy("academic");
          }}
        >
          Search by Academic
        </div> */}
        <div>
          <button
            id="dropdownDelayButton"
            data-dropdown-toggle="dropdownDelay"
            data-dropdown-delay="500"
            data-dropdown-trigger="hover"
            class="w-full justify-between text-gray-900 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => {
              setSearchName("");
              setAcadDropDown(true);
            }}
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
            class={` z-10 absolute  ${
              acadDropDown ? "block" : "hidden"
            }  bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700`}
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
                      setSearchBy("academic");
                      setSearchName(acad);
                      setAcadmicArray(acad);
                      setAcadDropDown(false);
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
        </div>
      </div>

      <div class="container flex flex-wrap mx-auto justify-center">
        {isCardLoading && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
        {!isCardLoading &&
          CopyAllProfile.map((profile, index) => {
            return (
              <Cards
                profile={profile}
                key={index}
                onClick={async () => {
                  await recommand(profile.AuthId).then(() => {
                    dispatch(getSchoolProfile_Data(profile));
                    localStorage.setItem("exploreSchoolID", profile.AuthId);
                    router.push("/School/Detail");
                  });
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CardComponent;
