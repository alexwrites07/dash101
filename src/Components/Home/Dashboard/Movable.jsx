import React, { useEffect, useState } from 'react';

const Map = ({ coordinates, onCoordinatesChange }) => {
  const [currentPosition, setCurrentPosition] = useState(coordinates);

  useEffect(() => {
    if (!coordinates) return;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: coordinates[1], lng: coordinates[0] },
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: coordinates[1], lng: coordinates[0] },
      map: map,
      draggable: true, // Allow the marker to be dragged
    });

    // Update coordinates when the map is clicked
    map.addListener('click', (event) => {
      const newCoordinates = [event.latLng.lng(), event.latLng.lat()];
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates);
      marker.setPosition(event.latLng); // Move the marker to the clicked location
    });

  

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
