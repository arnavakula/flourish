import { Link, useNavigate } from 'react-router-dom'
import YourPlants from './YourPlants';



const DashboardBody = ({ currTab }) => {
    const renderContent = () => {
        switch(currTab) {
            case 'Your Plants':
                return <YourPlants />
        }
    }

    
    return (
        <>
            {renderContent()}
        </>
    );
};

export default DashboardBody;
