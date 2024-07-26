import { Link } from 'react-router-dom'
import './Nav.css'

export default function Nav()  {
    return (
        <div className='Nav'>
             <ul>
                <li><Link to='/'><h2>Home</h2></Link></li>
                <li><Link to='/properties'><h2>Properties</h2></Link></li>
                <li><Link to='/properties/search'><h2>Search Properties</h2></Link></li>
             </ul>
        </div>
    )
}