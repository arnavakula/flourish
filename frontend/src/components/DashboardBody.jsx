import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import YourPlants from './YourPlants';
import AllPlants from './AllPlants';
import Community from './Community';



const DashboardBody = ({ currTab }) => {
    const renderContent = () => {
        switch(currTab) {
            case 'your-plants':
                return <YourPlants />
            case 'all-plants':
                return <AllPlants />
            case 'community':
                return (
                    <Routes>
                        <Route path='*' element={<Community />} />
                    </Routes>
                )
        }
    }

    
    return (
        <>
            {renderContent()}
        </>
    );
};

export default DashboardBody;
