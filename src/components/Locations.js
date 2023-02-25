import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

const Locations = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      "AIzaSyCKxtYtxwR8Cb3PdpYbngtqtUnxN4x-JcI&callback=initMap&v=weekly",
  });

  if (!isLoaded) {
    return <h1>Loading.....</h1>;
  }

  return <Map />;
};
const Map = () => {
  const [location, setLocation] = useState({ lat: 32.636049, lng: 73.007063 });
  useEffect(() => {
    console.log("Happende");
    navigator.geolocation.getCurrentPosition((resp) =>
      setLocation({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
      })
    );
  }, []);

  const [markerPosition, setMarkerPOsition] = useState({
    lat: 0,
    lng: 0,
  });
  return (
    <GoogleMap
      ref={(mapref) => mapref}
      zoom={17}
      center={location}
      mapContainerClassName={"w-full h-96 rounded-xl"}
      onClick={(values) => {}}
    >
      <MarkerF position={location} title={"Your Location"} />
    </GoogleMap>
  );
};

export default Locations;
