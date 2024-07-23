// MapComponent.jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ lat, lng, onClick }) => {
  const mapStyles = {
    height: '400px',
    width: '800px',
  };

  const defaultCenter = {
    lat: lat || 0,
    lng: lng || 0,
  };

  return (
    // <LoadScript googleMapsApiKey="YOUR API KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        onClick={onClick}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    // </LoadScript>
  );
};

export default MapComponent;
// import React, { useEffect, useRef } from 'react';

// const MapComponent = ({ lat, lng, onClick }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const loadMap = () => {
//       if (window.google && window.google.maps) {
//         const map = new window.google.maps.Map(mapRef.current, {
//           center: { lat, lng },
//           zoom: 12,
//         });

//         if (lat && lng) {
//           new window.google.maps.marker.AdvancedMarkerElement({
//             position: { lat, lng },
//             map: map,
//           });
//         }

//         window.google.maps.event.addListener(map, 'click', (event) => {
//           onClick(event);
//         });
//       }
//     };

//     loadMap();
//   }, [lat, lng, onClick]);

//   return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
// };

// export default MapComponent;
