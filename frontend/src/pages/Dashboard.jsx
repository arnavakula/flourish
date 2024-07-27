import { useState, useEffect } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import DashboardBody from '../components/DashboardBody';
import { useParams, useNavigate } from 'react-router-dom';



const Dashboard = () => {
    const tabs = ['your-plants', 'popular', 'all-plants', 'calendar', 'community'];
    const [currTab, setCurrTab] = useState('your-plants');
    const { tab } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!tabs.includes(tab)) {
            navigate('/dashboard/your-plants');
        } else {
            setCurrTab(tab);
        }
    }, [tab, navigate, tabs]);

    const handleTabChange = (newTab) => {
        navigate(`/dashboard/${newTab}`);
    };

    return (
        <div className='flex flex-col h-[100vh]'>
            <DashboardNavBar tabs={tabs} currTab={currTab} setCurrTab={handleTabChange} />
            <DashboardBody currTab={currTab} />
        </div>
    )
}

export default Dashboard;