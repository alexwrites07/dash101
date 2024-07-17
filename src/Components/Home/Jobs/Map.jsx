import React, { useEffect } from 'react';

const Map = ({ coordinates }) => {
  useEffect(() => {
    if (!coordinates) return;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: coordinates[1], lng: coordinates[0] },
      zoom: 12,
    });

    new window.google.maps.Marker({
      position: { lat: coordinates[1], lng: coordinates[0] },
      map: map,
    });
  }, [coordinates]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default Map;
