import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Map = ({ coordinates, onCoordinatesChange }) => {
  const [currentPosition, setCurrentPosition] = useState(coordinates || [0, 0]);
  const [address, setAddress] = useState('');
  const [apiKey, setApiKey] = useState('AIzaSyAK5qSOh-x80wTOpdKP_KkoDomw0C8s4Dw');
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted_address);
      } else {
        setAddress('No address found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };

  useEffect(() => {
    if (coordinates) {
      setCurrentPosition(coordinates);
      fetchAddress(coordinates[0], coordinates[1]);
    }
  }, [coordinates]);

  const handleMapClick = async (event) => {
    const newCoordinates = [event.latLng.lat(),event.latLng.lng()];
    setCurrentPosition(newCoordinates);
    onCoordinatesChange(newCoordinates);
    await fetchAddress(newCoordinates[0], newCoordinates[1]);
  };

  useEffect(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = new window.google.maps.Map(mapElement, {
      center: { lat: currentPosition[0], lng: currentPosition[1] },
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: currentPosition[0], lng: currentPosition[1] },
      map: map,
      draggable: true,
    });

    marker.addListener('dragend', async (event) => {
      const newCoordinates = [event.latLng.lat(), event.latLng.lng()];
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates);
      await fetchAddress(newCoordinates[0], newCoordinates[1]);
    });

    map.addListener('click', handleMapClick);

    return () => {
      marker.setMap(null);
    };
  }, [currentPosition, onCoordinatesChange]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div className="coordinates-display">
        <p>Latitude: {currentPosition[0]}</p>
        <p>Longitude: {currentPosition[1]}</p>
        <p>Address: {address}</p>
      </div>
    </div>
  );
};

export default Map;
