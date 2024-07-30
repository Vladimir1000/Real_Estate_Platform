import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapComponent from './MapComponent';
import Nav from "./Nav";
import './PropertyDetails.css';

const PROPERTY_PATH = "http://127.0.0.1:8000/properties/";

export default function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
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
    /// Booking state
    const [bookingStatus, setBookingStatus] = useState('');

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
            navigate(`/properties`)
        } else {
            const response = await axios.post(PROPERTY_PATH, property);
            navigate(`/properties/${response.data.id}`);
        }
    };

    const handleDelete = async () => {
        await axios.delete(`${PROPERTY_PATH}${id}/`);
        navigate('/properties');
    };
///////  Handles User Booking  /////
    const handleBooking = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/bookings/create/', {
                property_id: property.id,
                user_id: loggedInUser 
            });
            setBookingStatus('Booking successful!');
        } catch (error) {
            setBookingStatus('Booking failed!');
        }
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
        <div>
            <Nav />
            <div className="propertyDetails">
                {isEditing ? (
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
                        <button className="submit" type="submit">{id && id !== 'new' ? 'Update' : 'Create'} Property</button>
                    </form>
                ) : (
                    <>
                        <h1>{property.title}</h1>
                        <h2>Address: {property.address} {property.city}</h2>
                        <p>Description: {property.description}</p>
                        <p>Size: {property.size} sq.ft</p>
                        <p>Type: {property.type}</p>
                        <p>Status: {property.status}</p>
                        <p>Price: ${property.price}</p>
                        <img src={property.photo_url} alt={property.title} />
                        <MapComponent lat={parseFloat(property.latitude) || 0} lng={parseFloat(property.longitude) || 0} onClick={handleMapClick} />
                        <div className="button-container">
                            <button className="editButton" onClick={toggleEdit}>Edit</button>
                            {id && id !== 'new' && <button className="deleteButton" onClick={handleDelete}>Delete</button>}
                        </div>
                        <div className="booking-section">
                            <button className="bookingButton" onClick={handleBooking}>Book this property</button>
                            {bookingStatus && <p>{bookingStatus}</p>}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

