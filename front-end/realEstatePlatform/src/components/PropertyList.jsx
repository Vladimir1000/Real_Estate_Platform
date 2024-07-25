import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const PROPERTY_PATH = 'http://127.0.0.1:8000/properties';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axios.get(PROPERTY_PATH);
        setProperties(response.data);
        console.log('Fetched properties:', response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    getProperties();
  }, []);

  const showProperty = (id) => {
    navigate(`/properties/${id}`);
  };

  const handleCreate = () => {
    navigate('/properties/new');
  };

  if (properties.length === 0) {
    return <h2>Loading properties...</h2>;
  }

  return (
    <div className="properties">
      <Nav />
      <h1>Properties Page</h1>
      <button onClick={handleCreate}>Create New Property</button>
      <div className="property-grid">
        {properties.map((property) => {
          console.log('Rendering property with id:', property._id);
          return (
            <div key={property.id} onClick={() => showProperty(property.id)} className="property-card">
              <h2>{property.title}</h2>
              <p>Description: {property.description}</p>
              <p>Address: {property.address}</p>
              <p>City: {property.city}</p>
              <p>Size: {property.size}</p>
              <p>Type: {property.type}</p>
              <p>Status: {property.status}</p>
              <p>Price: ${property.price}</p>
              {property.photo_url && (
                <img src={property.photo_url} alt={property.title} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
