import GrassIcon from '@mui/icons-material/Grass';
import { Link } from 'react-router-dom';

const formatTabName = (tab) => {
    return tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const DashboardNavBar = ({ tabs, currTab }) => {

    return (
        <div className="flex w-[100vw] min-h-[8vh] bg-[#492b40] border-b-[0.5px] border-slate-200 ">
            <div className="w-[20%] flex items-center justify-center text-[1.5rem] text-white font-black antialiased">
                <GrassIcon className='mr-[5px]'/>
                <h2>Flourish</h2>
            </div>
            <div className="dashboard-nav-element w-[60%] flex justify-center gap-[4%] font-light text-[#bbb0b8]">
                {tabs.map((tab, i) => 
                    <Link 
                        key={i} 
                        id={tab} 
                        to={`/dashboard/${tab}`}
                        className={`w-[10%] flex items-center justify-center cursor-pointer ${currTab === tab ? 'text-white border-b-[3px] border-[#f3563e]' : ''}`}>
                            {formatTabName(tab)}
                    </Link>
                    
                )}
            </div>
        </div>
    );
};

export default DashboardNavBar;
