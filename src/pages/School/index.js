import WarningAlert from "@/components/Alerts/WarningAlert";
import CardComponent from "@/components/CardComponent";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";

const index = () => {
  const [isEmailVerified, setEmailVerified] = useState(true);

  return (
    <>
      {isEmailVerified && (
        <WarningAlert
          message={"Check your email for Verification"}
          button
          onClick={() => setEmailVerified(false)}
        />
      )}
      <NavBar />
      <div class="h-screen">
        <CardComponent />
      </div>
      <Footer />
    </>
  );
};

export default index;
