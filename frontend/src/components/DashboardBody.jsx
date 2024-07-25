import { Link, useNavigate } from 'react-router-dom'
import YourPlants from './YourPlants';
import AllPlants from './AllPlants';



const DashboardBody = ({ currTab }) => {
    const renderContent = () => {
        switch(currTab) {
            case 'Your Plants':
                return <YourPlants />
            case 'All Plants':
                return <AllPlants />
        }
    }

    
    return (
        <>
            {renderContent()}
        </>
    );
};

export default DashboardBody;
