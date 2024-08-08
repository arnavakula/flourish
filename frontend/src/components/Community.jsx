import { useState, useEffect } from 'react';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useSearchParams, Link, Outlet } from 'react-router-dom';

const Community = () => {
    const tabs = ['view', 'create', 'post'];
    const location = useLocation();
    const [tab, setTab] = useState('');
    const [sort, setSort] = useState('all');

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const newTab = location.pathname.split('/')[3];
        if(tabs.includes(newTab)){
            setTab(newTab);
        } else {
            setTab('view');
        }

        if(newTab !== 'popular' || newTab !== 'post' || newTab === 'view'){
            const newSort = searchParams.get('sort') === 'popular' ? 'popular' : 'all';
            setSort(newSort)
        }
    })
    // 2e2c2a
    // f5f4f2

    return (
        <>
        <div className="flex w-[100vw] min-h-[14vh] bg-[#14452f] border-b-[0.5px] text-[#bbb0b8]">
            <div className="w-[20%] flex flex-col items-center justify-center">
                <p className='text-[#bbb0b8] font-light'>Welcome to the community forum!</p>
                <p className='font-bold'>Temp Temp</p>
            </div>
        </div>
        <div className='w-[100vw] h-[76vh] flex flex-row p-4 bg-[#f5f4f2]'>
            <div className='LEFT-BAR w-[12%] h-[100%] pr-4 border-r-[1px] border-black'>
                <div className='w-[100%] h-[15%] flex flex-col justify-start gap-[10%] mt-[4vh] '>
                    <Link to='/dashboard/community/view?sort=all' className={`mx-auto text-center item-center rounded-lg w-[90%] hover:bg-[#e7e7e7] ${tab === 'view' && sort === 'all' ? 'bg-[#d4d4d4] hover:bg-[#d4d4d4]' : ''} `}>
                        <button className='w-[100%] h-[100%]'>
                            <span className='flex gap-[8px] font-semibold text-[#2e2c2a]'><SignalCellularAltIcon className='scale-125 ml-[5%]' style={{color: '#7FB069'}}/> All Posts </span>
                        </button>
                    </Link>
                    <Link to='/dashboard/community/create' className={`mx-auto text-center item-center rounded-lg w-[90%] hover:bg-[#e7e7e7] ${tab === 'create' ? 'bg-[#d4d4d4] hover:bg-[#d4d4d4]' : ''}`}>
                            <button className='w-[100%] h-[100%]'>
                                <span className='flex gap-[8px] font-semibold text-[#2e2c2a]'><AddIcon className='scale-125 ml-[5%]' style={{color: '#7FB069'}}/> Create Post </span>
                            </button>
                    </Link>
                </div>
            </div>
            
            <Outlet />
            

            

        </div>
        </>
    );
}

export default Community;
