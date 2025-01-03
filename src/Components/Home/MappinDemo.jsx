import React, { useEffect, useState } from 'react';

const Map = ({ pincode, onCoordinatesChange }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!pincode || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();

    // Fetch coordinates using Geocoder based on pincode
    geocoder.geocode({ address: pincode }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        const coordinates = [lat(), lng()];

        // Update the map and marker position
        if (!map) {
          const mapElement = document.getElementById('map');
          if (!mapElement) return;

          const newMap = new window.google.maps.Map(mapElement, {
            center: { lat: coordinates[0], lng: coordinates[1] },
            zoom: 12,
          });
          setMap(newMap);

          const newMarker = new window.google.maps.Marker({
            position: { lat: coordinates[0], lng: coordinates[1] },
            map: newMap,
            draggable: true,
          });
          setMarker(newMarker);

          // Handle marker drag end
          newMarker.addListener('dragend', (event) => {
            const newCoordinates = [event.latLng.lat(), event.latLng.lng()];
            onCoordinatesChange(newCoordinates); // Return the updated coordinates to parent
          });

          // Handle map click event
          newMap.addListener('click', (event) => {
            const newCoordinates = [event.latLng.lat(), event.latLng.lng()];
            newMarker.setPosition(event.latLng);
            onCoordinatesChange(newCoordinates); // Return the updated coordinates to parent
          });
        } else {
          // Update map and marker if map already exists
          map.setCenter({ lat: coordinates[0], lng: coordinates[1] });
          marker.setPosition({ lat: coordinates[0], lng: coordinates[1] });
        }

        // Send the coordinates to parent component
        onCoordinatesChange(coordinates);
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }, [pincode, map, marker, onCoordinatesChange]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Map;
