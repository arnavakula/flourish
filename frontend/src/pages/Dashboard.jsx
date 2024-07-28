import { useState, useEffect } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import DashboardBody from '../components/DashboardBody';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';



const Dashboard = () => {
    const tabs = ['your-plants', 'popular', 'all-plants', 'calendar', 'community'];
    const location = useLocation();
    const [currTab, setCurrTab] = useState('');

    useEffect(() => {
        const newTab = location.pathname.split('/').pop();
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