import { Route, Routes } from 'react-router-dom'
import PropertySearch from './components/PropertySearch';
import PropertyDetails from './components/PropertyDetails';
import PropertyList from './components/PropertyList'
import { LoadScript } from '@react-google-maps/api'; // part of google maps
import Home from './components/Home';

import './App.css'
// API_KEY stored in .emv file 
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  return (
      <div>
      <LoadScript googleMapsApiKey={apiKey}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<PropertyList/>} />
          <Route path="/properties/search" element={<PropertySearch/>} />
          <Route path="/properties/:id" element={<PropertyDetails/>} />
          <Route path="/properties/new" element={<PropertyDetails/>} />
          <Route path="/bookings" element={<PropertyDetails />} />
        </Routes>
      </LoadScript>
      </div>
  );
}

export default App
