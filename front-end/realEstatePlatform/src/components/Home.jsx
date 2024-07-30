import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropertySearch from './PropertySearch';
import './Home.css'

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
            <div className='home'>
                <div className="headerLinks">
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
                        <button className='logIn' onClick={toggleLoginForm}>LogIn</button>
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
            </div>
            <PropertySearch />
        </div>
    );
};

export default Header;
