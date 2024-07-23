import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const PROPERTY_PATH = 'http://127.0.0.1:8000/properties'

export default function Properties () {
    const [properties, setProperties] = useState([])

    useEffect(() => {
        const getProperties = async () => {
            const response = await axios.get(PROPERTY_PATH)
            setProperties(response.data)
            console.log(response.data)
        }
        getProperties()
    }, []);

    let navigate = useNavigate()

    const showProperty = (id) => {
        navigate(`/properties/${id}`)
    }
    const handleCreate = () => {
        navigate('/properties/new');
    }

    if (properties.length === 0) {
        return <h2>Loading properties</h2>
    } 
        return (
            
            <div className="properties">
            <h1>Properties Page</h1>
            <button onClick={handleCreate}>Create New Property</button>
            <div className="property-grid">
            {properties.map((property) => (
                <div key={property.id} onClick={() => showProperty(property.id)} className="pathDesc">
                    <h2>{property.title}</h2>
                    <p>Description: <span className="highlight">{property.description}</span></p>
                    <p>Address: {property.address}</p>
                    <p>City: {property.city}</p>
                    <p>Size: {property.size}</p>
                    <p>Type: {property.type}</p>
                    <p>Status: {property.status}</p>
                    <p>Price: <span className="highlight">${property.price}</span></p>
                    <img src={property.photo_url}/>
                </div>
            ))}
            </div>
          </div>
        )
        
    }
