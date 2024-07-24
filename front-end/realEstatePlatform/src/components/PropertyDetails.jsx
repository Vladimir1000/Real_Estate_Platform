// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MapComponent from './MapComponent';
// import { useParams, useNavigate } from 'react-router-dom';

// const PROPERTY_PATH = 'http://127.0.0.1:8000';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     address: '',
//     city: '',
//     size: '',
//     type: '',
//     status: 'active',
//     price: '',
//     photo_url: '',
//     latitude: '',
//     longitude: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Property ID:", id);  
//     if (id !== 'new') {
//       axios.get(`${PROPERTY_PATH}/properties/${id}/`)
//         .then(response => {
//           setProperty(response.data);
//           setLoading(false);
//         })
//         .catch(error => console.log(error));
//     } else {
//       setLoading(false);
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty({
//       ...property,
//       [name]: value || ''
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (id !== 'new') {
//       axios.put(`${PROPERTY_PATH}/properties/${id}/`, property)
//         .then(response => {
//           setProperty(response.data);
//           setIsEditing(false);
//         })
//         .catch(error => console.log(error));
//     } else {
//       axios.post(`${PROPERTY_PATH}/properties/`, property)
//         .then(response => {
//           navigate(`/properties/${response.data.id}`);
//         })
//         .catch(error => console.log(error));
//     }
//   };

//   const handleDelete = () => {
//     axios.delete(`${PROPERTY_PATH}/properties/${id}/`)
//       .then(() => {
//         navigate('/');
//       })
//       .catch(error => console.log(error));
//   };

//   const handleMapClick = (e) => {
//     setProperty({
//       ...property,
//       latitude: e.latLng.lat().toString(),
//       longitude: e.latLng.lng().toString()
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{id === 'new' ? 'Create Property' : 'Property Details'}</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={property.title}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={property.description}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Address:
//           <input
//             type="text"
//             name="address"
//             value={property.address}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           City:
//           <input
//             type="text"
//             name="city"
//             value={property.city}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Size:
//           <input
//             type="text"
//             name="size"
//             value={property.size}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Type:
//           <input
//             type="text"
//             name="type"
//             value={property.type}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Status:
//           <input
//             type="text"
//             name="status"
//             value={property.status}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Price:
//           <input
//             type="text"
//             name="price"
//             value={property.price}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Photo URL:
//           <input
//             type="text"
//             name="photo_url"
//             value={property.photo_url}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Latitude:
//           <input
//             type="text"
//             name="latitude"
//             value={property.latitude}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Longitude:
//           <input
//             type="text"
//             name="longitude"
//             value={property.longitude}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">{id === 'new' ? 'Create' : 'Update'}</button>
//       </form>
//       {id !== 'new' && (
//         <>
//           <button onClick={handleDelete}>Delete</button>
//           <button onClick={() => setIsEditing(!isEditing)}>
//             {isEditing ? 'Cancel Edit' : 'Edit Property'}
//           </button>
//         </>
//       )}
//       <MapComponent lat={parseFloat(property.latitude) || 0} lng={parseFloat(property.longitude) || 0} onClick={handleMapClick} />
//       <>
//         <h1>{property.title}</h1>
//         <h2>Address: {property.address}, {property.city}</h2>
//         <p>Description: {property.description}</p>
//         <p>Size: {property.size} sq.ft</p>
//         <p>Type: {property.type}</p>
//         <p>Status: {property.status}</p>
//         <p>Price: ${property.price}</p>
//         <img src={property.photo_url} alt={property.title} />
//       </>
//       </div>
//   );
// };

// export default PropertyDetails;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import MapComponent from './MapComponent';

// const PROPERTY_PATH = "http://127.0.0.1:8000/properties/";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     address: '',
//     city: '',
//     size: '',
//     type: '',
//     status: 'active',
//     price: '',
//     photo_url: '',
//     user_id: 2,
//     latitude: '',
//     longitude: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id && id !== 'new') {
//       const getPropertyDetails = async () => {
//         const response = await axios.get(`${PROPERTY_PATH}${id}/`);
//         setProperty(response.data);
//         setLoading(false);
//       };
//       getPropertyDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty({ ...property, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (id && id !== 'new') {
//       await axios.put(`${PROPERTY_PATH}${id}/`, property);
//     } else {
//       const response = await axios.post(PROPERTY_PATH, property);
//       navigate(`/properties/${response.data.id}`);
//     }
//   };

//   const handleDelete = async () => {
//     await axios.delete(`${PROPERTY_PATH}${id}/`);
//     navigate('/properties');
//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleMapClick = (e) => {
//     setProperty({
//       ...property,
//       latitude: e.latLng.lat().toString(),
//       longitude: e.latLng.lng().toString()
//     });
//   };

//   if (loading) {
//     return <h3>Loading...</h3>;
//   }

//   return (
//     <div className="propertyDetails">
//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input type="text" name="title" value={property.title} onChange={handleChange} required />
//           </label>
//           <label>
//             Description:
//             <textarea name="description" value={property.description} onChange={handleChange} required />
//           </label>
//           <label>
//             Address:
//             <input type="text" name="address" value={property.address} onChange={handleChange} required />
//           </label>
//           <label>
//             City:
//             <input type="text" name="city" value={property.city} onChange={handleChange} required />
//           </label>
//           <label>
//             Size:
//             <input type="text" name="size" value={property.size} onChange={handleChange} required />
//           </label>
//           <label>
//             Type:
//             <input type="text" name="type" value={property.type} onChange={handleChange} required />
//           </label>
//           <label>
//             Status:
//             <input type="text" name="status" value={property.status} onChange={handleChange} required />
//           </label>
//           <label>
//             Price:
//             <input type="text" name="price" value={property.price} onChange={handleChange} required />
//           </label>
//           <label>
//             Photo URL:
//             <input type="text" name="photo_url" value={property.photo_url} onChange={handleChange} required />
//           </label>
//           <label>
//             Latitude:
//             <input type="text" name="latitude" value={property.latitude} onChange={handleChange} required />
//           </label>
//           <label>
//             Longitude:
//             <input type="text" name="longitude" value={property.longitude} onChange={handleChange} required />
//           </label>
//           <button type="submit">{id && id !== 'new' ? 'Update' : 'Create'} Property</button>
//         </form>
//       ) : (
//         <>
//           <h1>{property.title}</h1>
//           <h2>Address: {property.address}, {property.city}</h2>
//           <p>Description: {property.description}</p>
//           <p>Size: {property.size} sq.ft</p>
//           <p>Type: {property.type}</p>
//           <p>Status: {property.status}</p>
//           <p>Price: ${property.price}</p>
//           <img src={property.photo_url} alt={property.title} />
//           <MapComponent lat={parseFloat(property.latitude) || 0} lng={parseFloat(property.longitude) || 0} onClick={handleMapClick} />
//           <div className="button-container">
//             <button onClick={toggleEdit}>Edit</button>
//             {id && id !== 'new' && <button className="deleteButton" onClick={handleDelete}>Delete</button>}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PropertyDetails;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapComponent from './MapComponent';
import PropertyForm from './PropertyForm';
import PropertyInfo from './PropertyInfo';

const PROPERTY_PATH = "http://127.0.0.1:8000/properties/";

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
    user_id: 2,
    latitude: '',
    longitude: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && id !== 'new') {
      const getPropertyDetails = async () => {
        const response = await axios.get(`${PROPERTY_PATH}${id}/`);
        setProperty(response.data);
        setLoading(false);
      };
      getPropertyDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id && id !== 'new') {
      await axios.put(`${PROPERTY_PATH}${id}/`, property);
    } else {
      const response = await axios.post(PROPERTY_PATH, property);
      navigate(`/properties/${response.data.id}`);
    }
  };

  const handleDelete = async () => {
    await axios.delete(`${PROPERTY_PATH}${id}/`);
    navigate('/properties');
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleMapClick = (e) => {
    setProperty({
      ...property,
      latitude: e.latLng.lat().toString(),
      longitude: e.latLng.lng().toString()
    });
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="propertyDetails">
      {isEditing ? (
        <PropertyForm property={property} handleChange={handleChange} handleSubmit={handleSubmit} />
      ) : (
        <>
          <PropertyInfo property={property} toggleEdit={toggleEdit} />
          <MapComponent lat={parseFloat(property.latitude) || 0} lng={parseFloat(property.longitude) || 0} onClick={handleMapClick} />
          {id && id !== 'new' && <button className="deleteButton" onClick={handleDelete}>Delete</button>}
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
