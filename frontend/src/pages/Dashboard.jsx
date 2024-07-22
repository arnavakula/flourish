import { useState } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import DashboardBody from '../components/DashboardBody';

const Dashboard = () => {
    const tabs = ['Your Plants', 'Popular', 'All Plants', 'Calendar', 'Community'];
    const [currTab, setCurrTab] = useState(tabs[0]);

    return (
        <div className='flex flex-col h-[100vh]'>
            <DashboardNavBar tabs={tabs} currTab={currTab} setCurrTab={setCurrTab} />
            <DashboardBody currTab={currTab} />
        </div>
    )
}

export default Dashboard;