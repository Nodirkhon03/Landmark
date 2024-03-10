import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import noteIconUrl from "./location.png";
import myLocationIconUrl from "./mylocation.png";
import NotesForm from "./NotesForm";

const backendUrl = "http://54.66.98.246/api/note";

const Map = ({ currentLocation }) => {
  const mapRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formPosition, setFormPosition] = useState(null);

  const fetchNotes = () => {
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        if (mapRef.current) {
          data.forEach((note) => {
            const noteIcon = L.icon({
              iconUrl: noteIconUrl,
              iconSize: [50, 50],
              iconAnchor: [25, 50],
              popupAnchor: [0, -50],
            });

            L.marker([note.latitude, note.longitude], {
              icon: noteIcon,
              title: note.user,
            })
              .addTo(mapRef.current)
              .bindPopup(`<strong>${note.user}</strong>: ${note.text}`);
          });
        }
      })
      .catch((error) => console.error("Error fetching notes:", error));
  };

  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [currentLocation.lat, currentLocation.lng],
      zoom: 13,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    const myLocationIcon = L.icon({
      iconUrl: myLocationIconUrl,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });

    L.marker([currentLocation.lat, currentLocation.lng], {
      icon: myLocationIcon,
      title: "Your Location",
    })
      .addTo(mapRef.current)
      .bindPopup("You are here")
      .openPopup();

    fetchNotes(); // Fetch notes when the component is mounted

    mapRef.current.on("click", function (e) {
      setFormPosition(e.latlng);
      setShowForm(true);
    });

    return () => {
      mapRef.current.off("click");
      mapRef.current.remove();
    };
  }, [currentLocation]); // Dependency array to fetch notes only when currentLocation changes

  const handleAddNote = (note) => {
    const newNote = {
      ...note,
      latitude: formPosition.lat,
      longitude: formPosition.lng,
    };

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        console.log(response);
        throw new Error("Network response was not ok.");
      })
      .then((addedNote) => {
        setNotes([...notes, addedNote]); // Update local state
        setShowForm(false);
        setFormPosition(null);
        fetchNotes(); // Refetch notes to update the map
      })
      .catch((error) => console.error("Error posting note:", error));
  };

  const handleMyLocation = () => {
    if (!mapRef.current) return;
    mapRef.current.setView(
      new L.LatLng(currentLocation.lat, currentLocation.lng),
      mapRef.current.getZoom()
    );
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      <button onClick={handleMyLocation}>My Location</button>
      <button onClick={handleToggleForm}>
        {showForm ? "Hide Form" : "Add Note"}
      </button>
      {showForm && (
        <NotesForm onAddNote={handleAddNote} position={formPosition} />
      )}
    </div>
  );
};

export default Map;
