import React, { useEffect, useState } from 'react';

const Map = ({ coordinates, onCoordinatesChange }) => {
  const [currentPosition, setCurrentPosition] = useState(coordinates);
  console.log(coordinates);

  useEffect(() => {
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) return;
    
    const [lng, lat] = coordinates;
    if (isNaN(lng) || isNaN(lat)) return; // Check if coordinates are valid numbers

    // Ensure map and marker are re-initialized if coordinates change
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = new window.google.maps.Map(mapElement, {
      center: { lat: lat, lng: lng }, // Initialize map with valid coordinates
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      draggable: true, // Allow the marker to be dragged
    });

    // Handle marker drag end event
    marker.addListener('dragend', (event) => {
      const newCoordinates = [event.latLng.lng(), event.latLng.lat()];
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates); // Send the updated coordinates back to the parent
    });

    // Handle map click event
    map.addListener('click', (event) => {
      const newCoordinates = [event.latLng.lng(), event.latLng.lat()];
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates); // Send the updated coordinates back to the parent
      marker.setPosition(event.latLng); // Move the marker to the clicked location
    });

    // Cleanup on component unmount
    return () => {
      marker.setMap(null);
    };
  }, [coordinates, onCoordinatesChange]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div className="coordinates-display">
        <p>Latitude: {currentPosition ? currentPosition[1] : 'N/A'}</p>
        <p>Longitude: {currentPosition ? currentPosition[0] : 'N/A'}</p>
      </div>
    </div>
  );
};

export default Map;
