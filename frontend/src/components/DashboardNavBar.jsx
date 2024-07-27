import { useState } from 'react';
import GrassIcon from '@mui/icons-material/Grass';


const DashboardNavBar = ({ tabs, currTab, setCurrTab }) => {
    const handleTabClick = (evt) => {
        setCurrTab(evt.target.id);
    }

    return (
        <div className="flex w-[100vw] min-h-[8vh] bg-[#492b40] border-b-[0.5px] border-slate-200 ">
            <div className="w-[20%] flex items-center justify-center text-[1.5rem] text-white font-black antialiased">
                <GrassIcon className='mr-[5px]'/>
                <h2>Flourish</h2>
            </div>
            <div className="dashboard-nav-element w-[60%] flex justify-center gap-[4%] font-light text-[#bbb0b8]">
                {tabs.map((tab, i) => 
                    <div 
                        key={i} 
                        id={tab} 
                        onClick={handleTabClick}
                        className={`w-[10%] flex items-center justify-center cursor-pointer ${currTab === tab ? 'text-white border-b-[3px] border-[#f3563e]' : ''}`}>
                            {tab}
                    </div>
                    
                )}
            </div>
        </div>
    );
};

export default DashboardNavBar;
