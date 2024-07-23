import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import { useParams, useNavigate } from 'react-router-dom';

const PROPERTY_PATH = 'http://127.0.0.1:8000'

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    size: '',
    type: '',
    status: 'active',
    price: '',
    photo_url: '',
    latitude: 0,
    longitude: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (id !== 'new') {
      axios.get(`${PROPERTY_PATH}/properties/${id}/`)
        .then(response => {
          setProperty(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== 'new') {
      axios.put(`${PROPERTY_PATH }/properties/${id}/`, property)
        .then(response => {
          setProperty(response.data);
          setIsEditing(false);
        })
        .catch(error => console.log(error));
    } else {
      axios.post(`${PROPERTY_PATH }/properties/`, property)
        .then(response => {
          navigate(`/properties/${response.data.id}`);
        })
        .catch(error => console.log(error));
    }
  };

  const handleDelete = () => {
    axios.delete(`${PROPERTY_PATH }/properties/${id}/`)
      .then(() => {
        navigate('/properties');
      })
      .catch(error => console.log(error));
  };

  const handleMapClick = (e) => {
    setProperty({
      ...property,
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{id === 'new' ? 'Create Property' : 'Property Details'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={property.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={property.size}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={property.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={property.status}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Photo URL:
          <input
            type="text"
            name="photo_url"
            value={property.photo_url}
            onChange={handleChange}
          />
        </label>
        <label>
          Latitude:
          <input
            type="text"
            name="latitude"
            value={property.latitude}
            onChange={handleChange}
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            name="longitude"
            value={property.longitude}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{id === 'new' ? 'Create' : 'Update'}</button>
      </form>
      {id !== 'new' && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Edit' : 'Edit Property'}
          </button>
        </>
      )}
      <MapComponent lat={property.latitude} lng={property.longitude} onClick={handleMapClick} />
    </div>
  );
};

export default PropertyDetails;
