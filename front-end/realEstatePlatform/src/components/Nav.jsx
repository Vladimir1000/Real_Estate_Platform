import { Link } from 'react-router-dom'

export default function Nav()  {
    return (
        <div className='Nav'>
            <Link to='/'><h2>Home</h2></Link>
            <Link to='/properties'><h2>Properties</h2></Link>
            <Link to='/properties/search'><h2>Search Properties</h2></Link>
        </div>
    )
}