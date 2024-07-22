import { useState } from 'react';


const DashboardNavBar = ({ tabs, currTab, setCurrTab }) => {
    const handleTabClick = (evt) => {
        setCurrTab(evt.target.id);
    }

    return (
        <div className="flex w-[100vw] h-[15vh]">
            <div style={{borderBottom: '1px solid gray'}} className="w-[25%] flex items-center justify-center">
                <h2>Flourish Dashboard</h2>
            </div>
            <div className="dashboard-nav-element w-[50%] flex">
                {tabs.map((tab, i) => 
                    <div 
                        key={i} 
                        id={tab} 
                        onClick={handleTabClick}
                        style={{
                            borderLeft: '1px solid gray', 
                            borderBottom: '1px solid gray',
                            backgroundColor: currTab === tab ? '#36604c' : 'white',
                            color: currTab === tab ? 'white' : 'black',
                        }} 
                        className="flex-1 flex items-center justify-center cursor-pointer ">
                            {tab}
                    </div>
                    
                )}
            </div>
            <div style={{borderBottom: '1px solid gray', borderLeft: '1px solid gray'}} className="w-[25%] p-4">
                
            </div>
        </div>
    );
};

export default DashboardNavBar;
