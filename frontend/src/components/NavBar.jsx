import  { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const NavBar = ({ sections, activeSection, scrollToSection }) => {
    const { authUser, logout } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleScroll = (section) => {
        scrollToSection(section);
        setIsExpanded(false);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user/logout`, { withCredentials: true });
            if (response.data.success) {
                logout();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
        <div className='fixed w-full h-[8vh] bg-[#285a34] flex items-center text-white z-10'>
            <div className='lg:hidden cursor-pointer z-10 my-auto pl-[4vw]'>
                {isExpanded ? (
                    <CloseIcon onClick={() => setIsExpanded(false)} />
                ) : (
                    <MenuIcon onClick={() => setIsExpanded(true)} />
                )}
            </div>
            <div className='flex font-source text-[1.3rem] text-[#c4c4c4] gap-[3vh] justify-between w-full px-10'>
                <div className='lg:flex gap-[5vh] hidden'>
                {sections.map(({ id, label }) => (
                        <h3 key={id} onClick={() => handleScroll(id)} className={`cursor-pointer hover:scale-110 hover:text-white hover:brightness-125 transition duration-150 ${
                                activeSection === id && 'text-white'
                            }`}
                        >
                            {label}
                        </h3>
                    ))}
                </div>
                <div className='hidden lg:flex gap-[4vh]'>
                {authUser ? (
                        <h3 onClick={handleLogout} className='cursor-pointer hover:scale-110 hover:text-white hover:brightness-125 transition duration-150'>Logout</h3>
                    ) : (
                        <>
                        <Link to='/login'><h3 className='cursor-pointer hover:scale-110 hover:text-white hover:brightness-125 transition duration-150'>Login</h3></Link>
                        <Link to='/register'><h3 className='cursor-pointer hover:scale-110 hover:text-white hover:brightness-125 transition duration-150'>Signup</h3></Link>
                        </>
                    )}
                    <Link to='/dashboard'>
                        <div className='bg-[#285a34] w-min rounded-full hover:scale-110 hover:text-white hover:brightness-125 transition duration-150 transition ease-in-out duration-150'>
                            <h3 className='cursor-pointer text-white'>Dashboard</h3>
                        </div>
                    </Link>
                </div>
            </div>

                    
            {isExpanded && (
                <nav className='absolute lg:hidden top-0 left-0 w-[40vw] h-[100vh] bg-black bg-opacity-90 flex flex-col gap-[2vw] z-5 font-source text-[1.3rem] text-[#c4c4c4]'>
                    {sections.map(({ id, label }) => (
                        <h3 key={id} onClick={() => handleScroll(id)} className={`cursor-pointer first:mt-[8vh] pl-[10vw] hover:scale-110 hover:text-white hover:brightness-125 transition duration-150 ${
                                activeSection === id && 'text-white'
                            }`}
                        >
                            {label}
                        </h3>
                    ))}

                    <hr className='w-[70%] mx-auto text-gray-200 border-[1px] border-gray-200 opacity-20' />

                    {authUser ? (
                        <h3 onClick={handleLogout} className='cursor-pointer pl-[10vw] hover:scale-110 hover:text-white hover:brightness-125 transition duration-150'>Logout</h3>
                    ) : (
                        <>
                        <Link to='/login'><h3 className='cursor-pointer pl-[10vw] hover:scale-110 hover:text-white hover:brightness-125 transition duration-150'>Login</h3></Link>
                        <Link to='/register'><h3 className='cursor-pointer pl-[10vw] hover:scale-110 hover:text-white hover:brightness-125 transition duration-150'>Signup</h3></Link>
                        </>
                    )}
                    <Link to='/dashboard'>
                        <div className='bg-[#285a34] w-min ml-[6vw] px-[4vw] rounded-full py-1 hover:scale-110 hover:text-white hover:brightness-125 transition duration-150 transition ease-in-out duration-150'>
                            <h3 className='cursor-pointer text-white'>Dashboard</h3>
                        </div>
                    </Link>
                </nav>
            )}
        </div>
        </>
    );
};

export default NavBar;
