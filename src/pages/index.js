import CardComponent from "@/components/CardComponent";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const index = () => {
  const AuthState = useSelector((state) => state.Auth_Reducer.users);

  const router = useRouter();

  useEffect(() => {
    console.log("From Index", AuthState);
    if (!AuthState.length) {
      router.replace("/Auth/");
    }
  }, [AuthState]);

  return (
    <div>
      <NavBar />
      <div className="h-screen">
        <h1 class="text-white">Evaluating</h1>
      </div>
      <Footer />
    </div>
  );
};

export default index;
