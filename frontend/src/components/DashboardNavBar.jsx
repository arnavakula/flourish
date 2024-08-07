import GrassIcon from '@mui/icons-material/Grass';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const formatTabName = (tab) => {
    return tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const DashboardNavBar = ({ tabs, currTab }) => {

    return (
        <div className="flex w-[100vw] min-h-[10vh] max-h-[10vh] bg-[#14452f] border-b-[0.5px] border-slate-200 ">
            <Link to='/' className="w-[20%] flex items-center justify-center text-[1.1rem] text-white font-semibold antialiased ">
                <h2><ArrowBackIcon className='mr-[5px]'/>Back to home</h2>
            </Link>
            <div className="dashboard-nav-element w-[60%] flex justify-center gap-[4%] font-light text-[#bbb0b8]">
                {tabs.map((tab, i) => 
                    <Link 
                        key={i} 
                        id={tab} 
                        to={`/dashboard/${tab}`}
                        className={`w-[10%] flex items-center justify-center cursor-pointer ${currTab === tab ? 'text-white border-b-[3px] border-[#f3563e] pt-[3px] transform: scale-105' : ''}`}>
                            {formatTabName(tab)}
                    </Link>
                    
                )}
            </div>
        </div>
    );
};

export default DashboardNavBar;
