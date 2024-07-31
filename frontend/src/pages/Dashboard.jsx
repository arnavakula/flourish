import { useState, useEffect } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import DashboardBody from '../components/DashboardBody';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useLocalStorage from '../hooks/useLocalStorage';


const Dashboard = () => {
    const tabs = ['your-plants', 'popular', 'all-plants', 'calendar', 'community'];
    const location = useLocation();
    const navigate = useNavigate();
    const { authUser, isLoggedIn } = useAuth();
    const [currTab, setCurrTab] = useState('');
    const { getItem } = useLocalStorage();

    useEffect(() => {
        if(!getItem('user')){
            navigate('/login');
        } else {
            console.log(`${getItem('user')}`);
        }
        const pathParts = location.pathname.split('/');
        const newTab = pathParts.length > 2 ? pathParts[2] : 'your-plants';

        if(tabs.includes(newTab)){
            setCurrTab(newTab);
        } else {
            setCurrTab('your-plants')
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