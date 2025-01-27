import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayDistance = ({ userCoords, tutorCoords }) => {
  const [distance, setDistance] = useState(null);

  // Function to calculate distance via API
  const getGoogleMapsDistance = async (lat1, lon1, lat2, lon2) => {
    try {
      const response = await axios.get(
        'https://api.olamaps.io/routing/v1/distanceMatrix/basic', {
          params: {
            origins: `${lat1},${lon1}`,
            destinations: `${lat2},${lon2}`,
            api_key: 'UDaikaVXCkOZM5eFYljZqvtpmq67a' // Use the API key from .env file
          }
        }
      );

      if (response.status === 200) {
        const distanceInMeters = response.data.rows[0].elements[0].distance.value;
        return (distanceInMeters / 1000).toFixed(2); // Convert to kilometers
      } else {
        return calculateDistance(lat1, lon1, lat2, lon2); // Fallback
      }
    } catch (error) {
      console.error('Error fetching distance:', error);
      return calculateDistance(lat1, lon1, lat2, lon2); // Fallback
    }
  };

  // Fallback manual distance calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Distance in km
  };

  useEffect(() => {
    const fetchDistance = async () => {
      if (userCoords && tutorCoords) {
        const calculatedDistance = await getGoogleMapsDistance(
          userCoords[1],
          userCoords[0],
          tutorCoords[0],
          tutorCoords[1]
        );
        setDistance(calculatedDistance);
      }
    };

    fetchDistance();
  }, [userCoords, tutorCoords]);

  return (
    <span className="text-sm text-gray-600">
      Distance: {distance ? `${distance} km` : 'Calculating...'}
    </span>
  );
};

export default DisplayDistance;
