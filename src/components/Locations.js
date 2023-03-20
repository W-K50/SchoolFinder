import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

const Locations = ({ setUploadLocation, SchoolLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      "AIzaSyCKxtYtxwR8Cb3PdpYbngtqtUnxN4x-JcI&callback=initMap&v=weekly",
  });

  if (!isLoaded) {
    return <h1>Loading.....</h1>;
  }

  return (
    <Map
      setUploadLocation={setUploadLocation}
      SchoolLocation={SchoolLocation}
    />
  );
};
const Map = ({ setUploadLocation, SchoolLocation }) => {
  const [location, setLocation] = useState({ lat: 34.197885, lng: 73.230449 });
  const [markerLocation, setMarkerLocation] = useState("");
  const [markerChange, setMarkerChaneg] = useState(false);
  useEffect(() => {
    if (SchoolLocation == "") {
      console.log(SchoolLocation);
      navigator.geolocation.getCurrentPosition((resp) => {
        setLocation({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        });
        setUploadLocation({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        });
        console.log(resp);
      });
    } else {
      setLocation(SchoolLocation);
      setUploadLocation(SchoolLocation);
    }
  }, []);
  useEffect(() => {
    if (markerChange) {
      setUploadLocation(markerLocation);
    }
  }, [markerLocation]);
  return (
    <GoogleMap
      ref={(mapref) => mapref}
      zoom={17}
      center={location}
      mapContainerClassName={"w-full h-96 rounded-xl"}
      onClick={(values) => {
        setMarkerLocation({
          lat: values.latLng.lat(),
          lng: values.latLng.lng(),
        });
      }}
    >
      <MarkerF
        position={markerLocation || location || SchoolLocation}
        title={"Your Location"}
      />
    </GoogleMap>
  );
};

export default Locations;
