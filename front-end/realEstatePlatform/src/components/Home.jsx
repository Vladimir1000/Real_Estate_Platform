import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropertySearch from './PropertySearch';
import Levenshtein from 'fast-levenshtein';
// here I should import my Logo when it is ready
// import './header.css';

const PROPERTY_PATH = 'http://127.0.0.1:8000';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState({});
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [formState, setFormState] = useState({ username: '', password: '', error: '' });
    const [users, setUsers] = useState([]);
    const loginFormRef = useRef(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        if (loggedInUser) {
            const getUserData = async (userId) => {
                const response = await axios.get(`${PROPERTY_PATH}/users/${userId}`);
                setUserData(response.data);
            };
            getUserData(loggedInUser);
        }

        const getUsers = async () => {
            try {
                const response = await axios.get(`${PROPERTY_PATH}/users/`);
                setUsers(response.data);
            } catch (error) {
                console.error('Could not find users', error);
            }
        };
        getUsers();
    }, [loggedInUser]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
            if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
                setShowLoginForm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // const handleSearchChange = (e) => {
    //     setSearchQuery(e.target.value);
    // };

    // const handleSearchSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get(`${PROPERTY_PATH}/properties/search/`, { params: { query: searchQuery } });
    //         const properties = response.data;

    //         if (properties.length > 0) {
    //             navigate(`/property/${properties[0].id}`);
    //         } else {
    //             const potentialMatches = properties.map(property => ({
    //                 ...property,
    //                 similarity: Levenshtein.get(searchQuery.trim().toLowerCase(), property.title.toLowerCase())
    //             }));
    //             potentialMatches.sort((a, b) => a.similarity - b.similarity);

    //             navigate('/search', {
    //                 state: {
    //                     searchQuery,
    //                     potentialMatches
    //                 }
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         alert('There was an error processing your search.');
    //     }
    // };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    const handleLoginChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value, error: '' });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const user = users.find(user => user.user_name === formState.username);
        if (!user) {
            setFormState({ ...formState, error: 'Username does not exist' });
            return;
        }
        if (user.password !== formState.password) {
            setFormState({ ...formState, error: 'Incorrect Password' });
            return;
        } else {
            localStorage.setItem('loggedInUser', user.id);
            setShowLoginForm(false);
            window.location.reload();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setShowUserMenu(false);
        window.location.reload();
    };

    return (
        <div className="header">
            {/* <img src={MusicCity_Logo} alt="Music City Tickets" className="logo" onClick={() => navigate('/')} /> */}
            {/* <form className="searchForm" onSubmit={handleSearchSubmit}>
                <input className='searchBar'
                    type="text"
                    id='searchBar'
                    placeholder='Search for properties'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className='searchBtn' type='submit'>Search</button>
            </form> */}
            <div className="headerLinks">
                {/* <button onClick={() => navigate('/')}>HOME</button>
                <button onClick={() => navigate('/properties')}>PROPERTIES</button> */}
                {loggedInUser ? (
                    <div className="userMenu" ref={userMenuRef}>
                        <img onClick={toggleUserMenu} src={userData.user_photo} alt="User" />
                        {showUserMenu && (
                            <ul className="dropdown">
                                {/* <li onClick={() => navigate(`/user/${loggedInUser}`)}>My Properties</li> */}
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <button onClick={toggleLoginForm}>Log In</button>
                )}
                {showLoginForm && (
                    <div className="loginOverlay" ref={loginFormRef}>
                        <form className="loginForm" onSubmit={handleLoginSubmit}>
                            <input type="text" id="username" placeholder="User Name" onChange={handleLoginChange} />
                            <input type="password" id="password" placeholder="Enter your password" onChange={handleLoginChange} />
                            {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}
                            <button type="submit">Log in</button>
                        </form>
                    </div>
                )}
            </div>
            <PropertySearch />
        </div>
    );
};

// const PropertySearch = () => {
    
//     const navigate = useNavigate();
//     const [searchParams, setSearchParams] = useState({
//         price_min: '',
//         price_max: '',
//         city: '',
//         address: ''
//     });

//     const [results, setResults] = useState([]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSearchParams({
//             ...searchParams,
//             [name]: value
//         });
//     };

//     const handleSearch = () => {
//         axios.get(`${PROPERTY_PATH}/properties/search/`, { params: searchParams })
//             .then(response => {
//                 setResults(response.data);
//             })
//             .catch(error => console.log(error));

//     };

//     const handlePropertyClick = (id) => {
//         navigate(`/properties/${id}`)
//       }
    

//     return (
//         <div>
//             <h2>Search Properties</h2>
//             <input
//                 type="text"
//                 name="price_min"
//                 value={searchParams.price_min}
//                 onChange={handleChange}
//                 placeholder="Min Price"
//             />
//             <input
//                 type="text"
//                 name="price_max"
//                 value={searchParams.price_max}
//                 onChange={handleChange}
//                 placeholder="Max Price"
//             />
//             <input
//                 type="text"
//                 name="city"
//                 value={searchParams.city}
//                 onChange={handleChange}
//                 placeholder="City"
//             />
//             <input
//                 type="text"
//                 name="address"
//                 value={searchParams.address}
//                 onChange={handleChange}
//                 placeholder="Address"
//             />
//             <button onClick={handleSearch}>Search</button>

//             <div>
//                 {results.map(property => (
//                     <div key={property.id} className='property-card'
//                     onClick={() => handlePropertyClick(property.id)}
//                     >
//                     <h3>{property.title}</h3>
//                     <p>{property.address}</p>
//                     </div>

//                 ))}
//             </div>
//         </div>
//     );
// };

export default Header;
