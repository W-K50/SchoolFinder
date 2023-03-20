import { GetAllProfiles } from "@/Config/Urls";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth_Data,
  getSchoolProfile_Data,
} from "Store/Auth_State/Auth_Actions";
import Cards from "./Cards";
import SearchBar from "./SearchBar";

const CardComponent = () => {
  const AuthState = useSelector((state) => state.Auth_Reducer.user);
  const SchoolProfileState = useSelector(
    (state) => state.Auth_Reducer.SchoolProfile
  );
  const [AllProfile, setAllProfile] = useState([]);
  const [CopyAllProfile, setCopyAllProfile] = useState([]);

  const dispatch = useDispatch();

  const router = useRouter();
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
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
  }, [searchName]);

  const getAllProfile = async () => {
    await axios
      .get(GetAllProfiles)
      .then((resp) => {
        console.log(resp.data);
        setAllProfile(resp.data.message);
        setCopyAllProfile(resp.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllProfile();
  }, []);

  return (
    <div>
      <SearchBar
        setSearchNameBack={setSearchName}
        searchNameBack={searchName}
      />
      <div class="container flex flex-wrap mx-auto justify-center">
        {CopyAllProfile.map((profile, index) => {
          return (
            <Cards
              profile={profile}
              key={index}
              onClick={() => {
                dispatch(getSchoolProfile_Data(profile));
                router.push("/Student/Detail");
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardComponent;
