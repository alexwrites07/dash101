import React, { useEffect, useState } from 'react';

const Map = ({ coordinates, onCoordinatesChange }) => {
  // Initialize state in [latitude, longitude] format
  const [currentPosition, setCurrentPosition] = useState([coordinates[0], coordinates[1]]);

  useEffect(() => {
    if (!coordinates) return;

    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Initialize the map with the coordinates in [latitude, longitude] format
    const map = new window.google.maps.Map(mapElement, {
      center: { lat: coordinates[0], lng: coordinates[1] }, // Correct format: lat for latitude, lng for longitude
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: coordinates[0], lng: coordinates[1] },
      map: map,
      draggable: true,
    });

    // Handle marker drag end event
    marker.addListener('dragend', (event) => {
      const newCoordinates = [event.latLng.lat(), event.latLng.lng()]; // [latitude, longitude]
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates); // Send [latitude, longitude] to parent
    });

    // Handle map click event
    map.addListener('click', (event) => {
      const newCoordinates = [event.latLng.lat(), event.latLng.lng()]; // [latitude, longitude]
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates); // Send [latitude, longitude] to parent
      marker.setPosition(event.latLng); // Update marker position on click
    });

    return () => {
      marker.setMap(null);
    };
  }, [coordinates, onCoordinatesChange]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div className="coordinates-display">
        <p>Latitude: {currentPosition[0]}</p>
        <p>Longitude: {currentPosition[1]}</p>
      </div>
    </div>
  );
};

export default Map;
