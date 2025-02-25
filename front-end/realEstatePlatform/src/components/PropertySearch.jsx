import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PropertySearch.css'

const PROPERTY_PATH = 'http://127.0.0.1:8000'

const PropertySearch = () => {
  const [searchParams, setSearchParams] = useState({
    price_min: '',
    price_max: '',
    city: '',
    address: ''
  });

  const [results, setResults] = useState([]);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSearch = () => {
    axios.get(`${PROPERTY_PATH}/properties/search/`, { params: searchParams })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => console.log(error));
  };

  const handlePropertyClick = (id) => {
    navigate(`/properties/${id}`)
  }

  return (
    <div>
        <div className='home-buttons'>
            <button className="home-button" onClick={() => navigate('/')}>HOME</button>
            <button className="properties-button" onClick={() => navigate('/properties')}>PROPERTIES</button>
        </div>
      <h2>Find the right home at the right price</h2>
      <input
        type="text"
        name="price_min"
        value={searchParams.price_min}
        onChange={handleChange}
        placeholder="Min Price"
      />
      <input
        type="text"
        name="price_max"
        value={searchParams.price_max}
        onChange={handleChange}
        placeholder="Max Price"
      />
      <input
        type="text"
        name="city"
        value={searchParams.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        type="text"
        name="address"
        value={searchParams.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button className="search-button" onClick={handleSearch}>SEARCH</button>

      <div>
        {results.map(property => (
            <div key={property.id} className='property-card'
            onClick={() => handlePropertyClick(property.id)}
            >
            <h3>{property.title}</h3>
            <p>{property.city}</p>
            <p>{property.address}</p>
            <p>{property.status}</p>
            <p>{property.type}</p>
            <img src={property.photo_url} alt={property.title} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySearch;


