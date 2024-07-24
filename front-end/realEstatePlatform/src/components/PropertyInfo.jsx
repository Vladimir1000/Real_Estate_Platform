import React from 'react';

const PropertyInfo = ({ property, toggleEdit }) => (
  <>
    <h1>{property.title}</h1>
    <h2>Address: {property.address}, {property.city}</h2>
    <p>Description: {property.description}</p>
    <p>Size: {property.size} sq.ft</p>
    <p>Type: {property.type}</p>
    <p>Status: {property.status}</p>
    <p>Price: ${property.price}</p>
    <img src={property.photo_url} alt={property.title} />
    <div className="button-container">
      <button onClick={toggleEdit}>Edit</button>
    </div>
  </>
);

export default PropertyInfo;
