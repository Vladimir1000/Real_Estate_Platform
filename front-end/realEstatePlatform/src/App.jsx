import { Route, Routes } from 'react-router-dom'
import PropertySearch from './components/PropertySearch';
import PropertyDetails from './components/PropertyDetails';
import PropertyList from './components/PropertyList'
import './App.css'

function App() {
  return (
      <div>
        <Routes>
          <Route path='/' element={<PropertyList/>} />
          <Route path="/search" element={<PropertySearch/>} />
          <Route path="/properties/:id" element={<PropertyDetails/>} />
          <Route path="/properties/new" element={<PropertyDetails/>} />
        </Routes>
      </div>
  );
}

export default App
