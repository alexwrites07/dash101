import React, { useEffect, useState } from 'react';

const Map = ({ coordinates, onCoordinatesChange }) => {
  // Store longitude first in the array as per your format: [longitude, latitude]
  const [currentPosition, setCurrentPosition] = useState([coordinates[0], coordinates[1]]);
  
  useEffect(() => {
    if (!coordinates) return;

    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Reverse to standard lat/lng when initializing map
    const map = new window.google.maps.Map(mapElement, {
      center: { lat: coordinates[1], lng: coordinates[0] }, // reverse for Maps
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: coordinates[1], lng: coordinates[0] },
      map: map,
      draggable: true,
    });

    // Handle marker drag end event
    marker.addListener('dragend', (event) => {
      const newCoordinates = [event.latLng.lng(), event.latLng.lat()]; // reversed for state
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates); // send reversed array to parent
    });

    // Handle map click event
    map.addListener('click', (event) => {
      const newCoordinates = [event.latLng.lng(), event.latLng.lat()]; // reversed for state
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates); // send reversed array to parent
      marker.setPosition(event.latLng); // set standard lat/lng on marker position
    });

    return () => {
      marker.setMap(null);
    };
  }, [coordinates, onCoordinatesChange]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div className="coordinates-display">
        <p>Latitude: {currentPosition[1]}</p>
        <p>Longitude: {currentPosition[0]}</p>
      </div>
    </div>
  );
};

export default Map;
