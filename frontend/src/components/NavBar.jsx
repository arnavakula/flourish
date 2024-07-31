import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const NavBar = () => {
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const { getItem, removeItem } = useLocalStorage();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/logout', { withCredentials: true });
            if(response.data.success){
                setIsLoggedIn(false);
                setAuthUser(null);
                removeItem('user');
            }
        } catch (err){
            console.log(err);
        }
    };

    const openDashboard = () => {
        if(authUser){
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }

    return (
        <nav className="w-[100vw] border flex flex-row">
            <h2 className="mx-[4em]">Flourish</h2>
            <ul className="flex flex-row gap-[2em]">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About Us </Link></li>
                <li onClick={openDashboard}className='cursor-pointer'>Dashboard</li>
            </ul>

            {getItem('user') ? ( 
                <ul className="flex flex-row gap-[2em] ml-auto mr-[2em]">
                    <li><a onClick={handleLogout} href='#'>Logout</a></li>
                </ul>
                ) :
                (
                    <ul className="flex flex-row gap-[2em] ml-auto">
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
                )
            }
        </nav>
    );
};

export default NavBar;
