import React, { useEffect, useState } from 'react';

const Map = ({ coordinates, onCoordinatesChange }) => {
  const [currentPosition, setCurrentPosition] = useState(coordinates);
  const [mapVisible, setMapVisible] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);

  useEffect(() => {
    if (!mapVisible || !coordinates) return;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: coordinates[0], lng: coordinates[1] },
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: coordinates[0], lng: coordinates[1] },
      map: map,
      draggable: true,
    });

    map.addListener('click', (event) => {
      const newCoordinates = [event.latLng.lat(),event.latLng.lng()];
      setCurrentPosition(newCoordinates);
      onCoordinatesChange(newCoordinates);
      marker.setPosition(event.latLng);
    });

    if (userCoordinates) {
      const [lat,lng] = userCoordinates;
      const newPosition = { lat, lng };
      marker.setPosition(newPosition);
      map.setCenter(newPosition);
      setCurrentPosition(userCoordinates);
      onCoordinatesChange(userCoordinates);
    }
  }, [coordinates, onCoordinatesChange, mapVisible, userCoordinates]);

  const handleMapToggle = () => {
    setMapVisible((prev) => !prev);
  };

  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoordinates = [latitude,longitude];
          setUserCoordinates(newCoordinates);
          setCurrentPosition(newCoordinates);
          onCoordinatesChange(newCoordinates);
        },
        (error) => {
          console.error('Error fetching user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSaveLocation = () => {
    if (userCoordinates) {
      onCoordinatesChange(userCoordinates);
      setCurrentPosition(userCoordinates);
    } else {
      console.error('No user coordinates to save.');
    }
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px',
  };

  return (
    <div>
      <button onClick={handleMapToggle} style={buttonStyle}>
        {mapVisible ? 'Hide Map' : 'Show Map'}
      </button>
      {mapVisible && (
        <>
          <div id="map" style={{ width: '100%', height: '400px' }}></div>
          <div className="coordinates-display">
            <p>Latitude: {currentPosition[0]}</p>
            <p>Longitude: {currentPosition[1]}</p>
          </div>
        </>
      )}
      <button onClick={handleGetUserLocation} style={buttonStyle}>
        Get My Location
      </button>
      {/* <button onClick={handleSaveLocation} style={buttonStyle}>
        Save My Location
      </button> */}
    </div>
  );
};

export default Map;
