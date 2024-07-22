import { useState } from 'react';

const DashboardNavBar = () => {
    const tabs = ['Your ', 'Popular', 'All ', 'Calendar', 'Community'];

    const [currTab, setCurrTab] = useState(tabs[0]);

    const handleTabClick = (evt) => {
        setCurrTab(evt.target.id);
    }
    return (
        <div className="flex w-[100vw] h-[15vh]">
            <div style={{borderBottom: '1.75px solid gray'}} className="w-[25%] p-4 flex items-center pl-[5%]">
                <h2>Flourish Dashboard</h2>
            </div>
            <div className="w-[50%] flex">
                {tabs.map((tab, i) => 
                    <div 
                        key={i} 
                        id={tab} 
                        onClick={handleTabClick} 
                        style={{
                            borderLeft: '1.75px solid gray', 
                            borderBottom: '1.75px solid gray',
                            backgroundColor: currTab === tab ? '#36604c' : 'white',
                            color: currTab === tab ? 'white' : 'black'
                        }} 
                        className="flex-1 flex items-center justify-center cursor-pointer">
                        {tab}    
                    </div>
                )}
            </div>
            <div style={{border: '1.75px solid gray', borderStyle: 'none none solid solid'}} className="w-[25%] p-4">
                
            </div>
        </div>
    );
};

export default DashboardNavBar;
