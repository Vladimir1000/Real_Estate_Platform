import React from 'react';

const PropertyForm = ({ property, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>
      Title:
      <input type="text" name="title" value={property.title} onChange={handleChange} required />
    </label>
    <label>
      Description:
      <textarea name="description" value={property.description} onChange={handleChange} required />
    </label>
    <label>
      Address:
      <input type="text" name="address" value={property.address} onChange={handleChange} required />
    </label>
    <label>
      City:
      <input type="text" name="city" value={property.city} onChange={handleChange} required />
    </label>
    <label>
      Size:
      <input type="text" name="size" value={property.size} onChange={handleChange} required />
    </label>
    <label>
      Type:
      <input type="text" name="type" value={property.type} onChange={handleChange} required />
    </label>
    <label>
      Status:
      <input type="text" name="status" value={property.status} onChange={handleChange} required />
    </label>
    <label>
      Price:
      <input type="text" name="price" value={property.price} onChange={handleChange} required />
    </label>
    <label>
      Photo URL:
      <input type="text" name="photo_url" value={property.photo_url} onChange={handleChange} required />
    </label>
    <label>
      Latitude:
      <input type="text" name="latitude" value={property.latitude} onChange={handleChange} required />
    </label>
    <label>
      Longitude:
      <input type="text" name="longitude" value={property.longitude} onChange={handleChange} required />
    </label>
    <button type="submit">{property.id && property.id !== 'new' ? 'Update' : 'Create'} Property</button>
  </form>
);

export default PropertyForm;
