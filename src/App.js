import React, { useState, useEffect } from "react";
import Map from "./map/map";
import NotesList from "./map/NoteList";

function App() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [notes] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Could not fetch your location!");
      }
    );
  }, []);

  return (
    <div>
      <header className="app-header">
        <h1>My Community Landmark</h1>
        <p>Share and discover notes about places in your community!</p>
      </header>
      <Map currentLocation={currentLocation} notes={notes} />
      <NotesList notes={notes} />
    </div>
  );
}

export default App;
