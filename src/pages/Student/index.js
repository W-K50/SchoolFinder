import CardComponent from "@/components/CardComponent";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import React from "react";

const index = () => {
  return (
    <>
      <NavBar />
      <div class="h-screen">
        <CardComponent />
      </div>
      <Footer />
    </>
  );
};

export default index;
