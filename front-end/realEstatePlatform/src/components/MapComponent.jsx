import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

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
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        onClick={onClick}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
  );
};

export default MapComponent;

