import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import useAuth from '../hooks/useAuth';




const NavBar = ({ scrollToSection, section1Ref, section2Ref, section3Ref }) => {
    const { authUser, logout } = useAuth();
    const { getItem, removeItem } = useLocalStorage();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/logout', { withCredentials: true });
            if (response.data.success) {
                logout();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openDashboard = () => {
        if (authUser) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }

    return (
        <nav className="w-[100vw] h-[8vh] flex flex-row items-center text-[#285a34]">
            <h2 className="font-bold text-[1.6em] mx-[4rem]">Flourish</h2>

            <div className='flex gap-[3em] font-medium text-[1.1em]'>
                <Link to='/'><h2 className='cursor-pointer'>Home</h2></Link>
                {/* <h2 className='cursor-pointer' onClick={() => scrollToSection(section1Ref)}>Home</h2> */}
                {/* <h2 className='cursor-pointer' onClick={() => scrollToSection(section2Ref)}>About Us</h2> */}
                <Link to='/dashboard'><h2 className='cursor-pointer'>Dashboard</h2></Link>
            </div>

            {authUser ? (

                <ul className="flex gap-[2em] ml-auto pr-[2vw] font-medium text-[1.2em]">
                    <li><a onClick={handleLogout} href='#'>Logout</a></li>
                </ul>
            ) :
                (
                    <ul className="flex gap-[2em] ml-auto pr-[2vw] font-medium text-[1.2em]">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </ul>
                )
            }
        </nav>
    );
};

export default NavBar;
