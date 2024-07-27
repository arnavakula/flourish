import { useState, useEffect } from 'react';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';

const Community = () => {
    const tabs = ['view', 'create', 'edit']
    const location = useLocation();
    const navigate = useNavigate();
    const [tab, setTab] = useState(location.pathname.split('/').pop());

    useEffect(() => {
        if(location.pathname === '/dashboard/community/' || location.pathname === '/dashboard/community' || !tabs.includes(tab)){
            navigate('/dashboard/community/view');
        }
    }, [tab])
    

    console.log(location.pathname);
    console.log(tab);   
    
    const handleTabChange = (newTab) => {
        setTab(newTab);
    };
    
    return (
        <>
        <div className="flex w-[100vw] min-h-[14vh] bg-[#492b40] border-b-[0.5px] text-[#bbb0b8]">
            <div className="w-[20%] flex flex-col items-center justify-center">
                <p className='text-[#bbb0b8] font-light'>Welcome to the community forum!</p>
                <p className='font-bold'>Temp Temp</p>
            </div>
        </div>
        <div className='w-[100vw] h-[100%] border-2 border-green-800 flex flex-row'>
            <div className='LEFT-BAR w-[20%] h-[100%]'>
                <div className='w-[100%] h-[15%] flex flex-col justify-start gap-[2px] mt-[1vh]'>
                    <button 
                        className={`rounded-lg w-[60%] flex-1 mx-auto ${tab === 'All' ? 'bg-[#bbb0b8]' : ''}`} 
                        onClick={() => handleTabChange('All')}
                    >
                        <span className='flex justify-center gap-[8px]'><SignalCellularAltIcon /> All</span>
                    </button>
                    <button 
                        className={`rounded-lg w-[60%] flex-1 mx-auto ${tab === 'Popular' ? 'bg-[#bbb0b8]' : ''}`} 
                        onClick={() => handleTabChange('Popular')}
                    >
                        <span className='flex justify-center gap-[8px]'><TrendingUpIcon />  Popular</span>
                    </button>
                
                </div>
                <hr className='my-3 w-[75%] mx-auto '/>
                <div className='w-[100%] h-[7.5%] flex flex-col justify-start rounded-lg gap-[2px]'>
                    <button 
                        className={`rounded-lg w-[60%] flex-1 mx-auto ${tab === 'Create a Post' ? 'bg-[#bbb0b8]' : ''}`} 
                        onClick={() => handleTabChange('Create a Post')}
                    >
                        <span className='flex justify-center gap-[8px]'><AddIcon />  Create a Post</span>
                    </button>
                </div>
            </div>
            <div className='CENTER-CONTENT w-[80%] h-[100%] border'>
                <div className='w-[80%] mt-[1vh] rounded-3xl border mx-auto h-[100%]'>

                </div>
            </div>
            <div className='w-[20%] h-[100%] border'>

            </div>

        </div>
        </>
    );
}

export default Community;
