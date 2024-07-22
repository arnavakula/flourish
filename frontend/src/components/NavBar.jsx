import React, { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/user/login', {
                username: 'arnavakula', 
                password: 'monkey' 
            }, { withCredentials: true });

            setIsLoggedIn(true);
            setAuthUser(response.data.user);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/logout', { withCredentials: true });
            if(response.data.success){
                setIsLoggedIn(false);
                setAuthUser(null);
            }
        } catch (err){
            console.log(err);
        }
    }

    return (
        <nav className="w-[100vw] border flex flex-row">
            <h2 className="mx-[4em]">Flourish</h2>
            <ul className="flex flex-row gap-[2em]">
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About Us </a></li>
                <li><a href='#'>Dashboard</a></li>
            </ul>

            {isLoggedIn ? ( 
                <ul className="flex flex-row gap-[2em] ml-auto mr-[2em]">
                    <li><a onClick={handleLogout} href='#'>Logout</a></li>
                </ul>
                ) :
                (
                    <ul className="flex flex-row gap-[2em] ml-auto">
                    <li><Link to='/login'>Login</Link></li>
                    <li><a href='#'>Register</a></li>
                </ul>
                )
            }
        </nav>
    );
};

export default NavBar;
