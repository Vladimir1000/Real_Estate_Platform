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
