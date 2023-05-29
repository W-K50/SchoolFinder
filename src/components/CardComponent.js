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

  const [searchPlaceholder, setsearchPlaceholder] = useState("School Name");

  useEffect(() => {
    if (searchbyArea !== true) {
      console.log("Search by Name");
      if (searchName !== "") {
        const newSearchSchool = CopyAllProfile.filter((profile) => {
          const SchoolName = profile.schoolname?.toLowerCase();
          const searchText = searchName?.toLowerCase();
          if (SchoolName.includes(searchText)) {
            return profile;
          }
        });
        setCopyAllProfile(newSearchSchool);
      } else {
        setCopyAllProfile(AllProfile);
      }
    } else if (searchbyArea === true) {
      console.log("Search by Area");
      if (searchName !== "") {
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
      } else {
        setCopyAllProfile(AllProfile);
      }
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
            searchbyArea ? "bg-blue-700" : "bg-gray-600"
          } px-3 py-2 rounded-full text-white cursor-pointer hover:bg-blue-600`}
          onClick={() => {
            setSearchByArea((oldState) => setSearchByArea(!oldState));
          }}
        >
          Search by Area
        </div>
        <div
          className={`${
            searchbyAcademic ? "bg-blue-700" : "bg-gray-600"
          } px-3 py-2 rounded-full text-white cursor-pointer hover:bg-blue-600 ml-3`}
          onClick={() => {
            setSearchByAcademic((oldState) => setSearchByAcademic(!oldState));
            if (searchbyAcademic === true) {
              setsearchPlaceholder("Academic");
            } else {
              setsearchPlaceholder("School Name");
            }
          }}
        >
          Search by Academic
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
