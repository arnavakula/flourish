import { useState, useEffect, useContext } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useLocalStorage from '../hooks/useLocalStorage';


const Dashboard = () => {
    const tabs = ['your-garden', 'popular', 'all-plants', 'calendar', 'community'];
    const location = useLocation();
    const navigate = useNavigate();
    const { authUser, isLoggedIn } = useContext(AuthContext);
    const [currTab, setCurrTab] = useState('');
    const { getItem } = useLocalStorage();

    useEffect(() => {
        if(!authUser){
            navigate('/login');
        }
        
        const pathParts = location.pathname.split('/');
        const newTab = pathParts.length > 2 ? pathParts[2] : 'your-garden';

        if(tabs.includes(newTab)){
            setCurrTab(newTab);
        } else {
            setCurrTab('your-garden')
        }
    })
    

    return (
        <div className='flex flex-col h-[100vh]'>
            <DashboardNavBar tabs={tabs} currTab={currTab} />
            <Outlet />
        </div>
    )
}

export default Dashboard;