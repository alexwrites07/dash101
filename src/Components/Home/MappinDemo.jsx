import React, { useEffect, useState } from 'react';

const Map = ({ pincode, onCoordinatesChange }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const apiKey = "AIzaSyAK5qSOh-x80wTOpdKP_KkoDomw0C8s4Dw"; 
  const initializeMap = (lat, lng) => {
    if (map) {
      map.setCenter({ lat, lng });
      marker.setPosition({ lat, lng });
      return;
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const newMap = new window.google.maps.Map(mapElement, {
      center: { lat, lng },
      zoom: 12,
    });
    setMap(newMap);

    const newMarker = new window.google.maps.Marker({
      position: { lat, lng },
      map: newMap,
      draggable: true,
    });
    setMarker(newMarker);

    newMarker.addListener('dragend', (event) => {
      const newCoordinates = [event.latLng.lat(), event.latLng.lng()];
      console.log('Dragged coordinates:', newCoordinates); // Debugging
      onCoordinatesChange(newCoordinates);
    });

    newMap.addListener('click', (event) => {
      const newCoordinates = [event.latLng.lat(), event.latLng.lng()];
      newMarker.setPosition(event.latLng);
      console.log('Clicked coordinates:', newCoordinates); // Debugging
      onCoordinatesChange(newCoordinates);
    });

    onCoordinatesChange([lat, lng]);
  };

  useEffect(() => {
    if (!window.google || !pincode) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: pincode }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        initializeMap(lat(), lng());
      } else {
        initializeMap(0, 0); // Default to New Delhi coordinates
      }
    });
  }, [pincode]);

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (marker) {
            marker.setPosition({ lat: latitude, lng: longitude });
            map.setCenter({ lat: latitude, lng: longitude });
            onCoordinatesChange([latitude, longitude]);
          }
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleFetchByPincode = () => {
    if (!pincode) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: pincode }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        if (marker) {
          marker.setPosition({ lat: lat(), lng: lng() });
          map.setCenter({ lat: lat(), lng: lng() });
          onCoordinatesChange([lat(), lng()]);
        }
      } else {
        alert('Invalid pincode or unable to fetch location.');
      }
    });
  };

  return (
    <div>
      <div>
        <button
          className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none m-4 -ml-0"
          onClick={handleFetchByPincode}
        >
          Fetch by Pincode
        </button>
        <button
          className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none m-4"
          onClick={handleFetchLocation}
        >
          Fetch My Location
        </button>
      </div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Map;
