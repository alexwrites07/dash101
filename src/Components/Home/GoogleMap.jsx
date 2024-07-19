import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const GoogleMap2 = () => {
  const [confirmedLocation, setConfirmedLocation] = useState({ lat: 40.7128, lng: -74.006 }); // Default to New York City
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [radius, setRadius] = useState(10); // Default radius in miles
  const [address, setAddress] = useState(''); // State to hold the address
  const [showMap, setShowMap] = useState(false); // State to control map visibility
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const handleMapClick = (event) => {
    setConfirmedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleRadiusChange = (event) => {
    setRadius(parseInt(event.target.value));
  };

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = {
        lat: mapRef.current.getCenter().lat(),
        lng: mapRef.current.getCenter().lng(),
      };
      setCenter(newCenter);
    }
  };

  const handleConfirmLocation = () => {
    fetchAddress(center.lat, center.lng);
    setShowMap(false);
    navigate('/jobpost');
  };

  const fetchAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress('Address not found');
        }
      } else {
        setAddress('Geocoder failed due to: ' + status);
      }
    });
  };

  const lineCoordinates = [
    { lat: center.lat - 0.05, lng: center.lng }, // Start of the line
    { lat: center.lat + 0.05, lng: center.lng }, // End of the line
  ];

  const googleMapsApiKey = process.env.MAPS_APIKEY;

  return (
    <div className="max-w-full mx-auto flex flex-col" style={{ margin: '6% 4% 0 4%' }}>
      {/* Sidebar for Filters and Controls */}
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl text-[#041F96] font-bold mb-4">Google Maps Integration</h2>

        {/* Confirmed Location Display */}
        {confirmedLocation && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Confirmed Location:</h3>
            <p className="text-gray-700">{`Lat: ${confirmedLocation.lat}, Lng: ${confirmedLocation.lng}`}</p>
            <p className="text-gray-700">{`Address: ${address}`}</p>
          </div>
        )}

        {/* Set Radius */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Set Radius (miles)</label>
          <input
            type="number"
            name="radius"
            id="radius"
            value={radius}
            onChange={handleRadiusChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter radius"
          />
        </div>

        {/* Locate Button */}
        <div className="mb-4">
     
          <button
            className="bg-[#041F96] text-white px-3 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none text-sm"
            onClick={() => setShowMap(true)}
          >
            Locate
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mb-6">
        <h2 className="text-3xl text-[#041F96] font-bold mb-4">Google Maps Display</h2>
        {/* Your job listing and filters here */}
      </div>

      {/* Google Maps Component */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg mx-4" style={{ maxWidth: '500px', width: '100%' }}>
            <LoadScript
              // googleMapsApiKey: process.env.MAPS_APIKEY;
              onLoad={() => console.log('Google Maps loaded successfully')}
              onError={(error) => console.error('Error loading Google Maps:', error)}
            >
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={confirmedLocation}
                zoom={12}
                onClick={handleMapClick}
                onCenterChanged={handleCenterChanged}
                onLoad={(map) => (mapRef.current = map)}
              >
                <Marker position={confirmedLocation} />
                <Polyline
                  path={lineCoordinates}
                  options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
                />
              </GoogleMap>
            </LoadScript>

            <button
              className="bg-[#041F96] text-white px-3 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none mt-4 text-sm"
              onClick={handleConfirmLocation}
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap2;
