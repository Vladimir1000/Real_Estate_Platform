import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PROPERTY_PATH = 'http://127.0.0.1:8000'

const PropertySearch = () => {
  const [searchParams, setSearchParams] = useState({
    price_min: '',
    price_max: '',
    city: '',
    address: ''
  });

  const [results, setResults] = useState([]);

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

  return (
    <div>
      <h2>Search Properties</h2>
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
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map(property => (
          <div key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySearch;
