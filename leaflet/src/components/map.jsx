import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyMap = () => {
  const [position, setPosition] = useState(null); // State to store user's location
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    // Function to fetch location using IP address
    const fetchLocationByIP = async () => {
      try {
        // Fetch location data from ipinfo.io API
        const response = await fetch(
          "https://ipinfo.io/json?token=YOUR_API_KEY"
        ); // Replace with your API key
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }

        const data = await response.json(); // Parse JSON response
        console.log("IP Info Response Data:", data); // Debug log
        const loc = data.loc.split(","); // Split 'loc' field into latitude and longitude
        setPosition([parseFloat(loc[0]), parseFloat(loc[1])]); // Update position state
      } catch (err) {
        console.error("Error fetching location data:", err); // Log errors to the console
        setError(err.message); // Update error state
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchLocationByIP(); // Fetch location when component mounts
  }, []);

  if (loading) return <p>Loading map...</p>; // Show loading state
  if (error) return <p>Error loading map: {error}</p>; // Show error state if any

  return (
    <>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Unable to get location data.</p>
      )}
    </>
  );
};

export default MyMap;
