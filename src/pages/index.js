import CardComponent from "@/components/CardComponent";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import React from "react";

const index = () => {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <CardComponent />
      <Footer />
    </div>
  );
};

export default index;
