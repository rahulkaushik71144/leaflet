import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Ensure to use a valid Stamen tile layer URL
const MyMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]); // Set user's current position
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100vh", width: "100%" }} // Ensure the map container has full size
        >
          {/* Stamen Toner Tile Layer for a minimalistic design */}
          <TileLayer
            url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://stamen-tiles.a.ssl.fastly.net">Stamen Design</a> contributors'
          />
          {/* Marker at user's position */}
          <Marker position={position}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </>
  );
};

export default MyMap;
