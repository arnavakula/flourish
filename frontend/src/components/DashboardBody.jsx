import { Link, useNavigate } from 'react-router-dom'
import YourPlants from './YourPlants';
import AllPlants from './AllPlants';
import Community from './Community';



const DashboardBody = ({ currTab }) => {
    const renderContent = () => {
        switch(currTab) {
            case 'Your Plants':
                return <YourPlants />
            case 'All Plants':
                return <AllPlants />
            case 'Community':
                return <Community />
        }
    }

    
    return (
        <>
            {renderContent()}
        </>
    );
};

export default DashboardBody;
