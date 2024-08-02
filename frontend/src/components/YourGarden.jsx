import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const YourGarden = () => {
    return (
        <div className='w-[100%] h-full flex'>
            <div className='h-[100%] border-2 border-green-800 w-[5%] flex flex-col gap-[10px] pt-[10px]'>
                <Link to='/dashboard/your-garden' className='mx-auto'>
                    <CalendarMonthIcon fontSize='large'/>
                </Link>
                <Link to='/dashboard/your-garden/list-view' className='mx-auto'>
                    <FormatListBulletedIcon fontSize='large'/>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default YourGarden;