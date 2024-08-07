import { useEffect, useState } from "react";
import '../assets/styles/GardenCalendar.css';
import axios from "axios";
import useAuth from "../hooks/useAuth";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useLocalStorage from "../hooks/useLocalStorage";
import CropDropdown from "./CropDropdown";
import SpaIcon from '@mui/icons-material/Spa';


const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
};

const darkenColor = (hex, percent) => {
    const bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    r = Math.max(0, Math.min(255, r - Math.round(r * (percent / 100))));
    g = Math.max(0, Math.min(255, g - Math.round(g * (percent / 100))));
    b = Math.max(0, Math.min(255, b - Math.round(b * (percent / 100))));

    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
};

const getTaskIcon = (task, classStr) => {
    if (task === 'germination') {
        return <SpaIcon className={`${classStr}`} />
    }
}

const pastelColors = [
    "#E6E6FA",
    "#98FF98",
    "#FFDAB9",
    "#87CEEB",
    "#F4C2C2",
    "#FFFFE0",
    "#F08080",
    "#AFEEEE",
    "#98FB98",
    "#C5CBE1",
    "#FFD1B3",
    "#B0E0E6",
    "#FFE4E1",
    "#FFDAB9",
    "#D8BFD8",
    "#FFA07A",
    "#D7BDE2",
    "#FFC0CB",
    "#FFFACD",
    "#F5FFFA"
];

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const getCurrentDate = () => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${monthNames[month]} ${date}, ${year}`;
}

const currentDate = {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
}

const formatDate = (date, month, year) => {
    return `${monthNames[month]} ${date}, ${year}`;
}

const capitalize = (s) => {
    return s.toString().charAt(0).toUpperCase() + s.toString().slice(1);
}

const GardenCalendar = () => {
    const { authUser } = useAuth();
    const { getItem, setItem } = useLocalStorage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disableAddButton, setDisableAddButton] = useState(true);
    const [crops, setCrops] = useState([]);
    const [userCrops, setUserCrops] = useState([]);
    const [colorIndex, setColorIndex] = useState(Number(getItem('colorIndex')));
    const [isTaskInfoOpen, setIsTaskInfoOpen] = useState(false);
    const [taskInfo, setTaskInfo] = useState(null);
    const [formInfo, setFormInfo] = useState({'quantity': 1});

    const getUserCrops = async () => {
        const userCrops = await axios.get(`http://localhost:8000/crop/user/${authUser}`, { withCredentials: true });

        const sortedCrops = userCrops.data.crops.reduce((acc, item) => {
            if (!acc[item.crop.name]) {
                acc[item.crop.name] = [];
            }
            acc[item.crop.name].push(item);
            return acc;
        }, {});

        setUserCrops(sortedCrops);
    }


    useEffect(() => {
        const fetchCrops = async () => {
            const response = await axios.get('http://localhost:8000/crop', { withCredentials: true });
            setCrops(response.data.crops.sort((a, b) => a.name.localeCompare(b.name)));

            getUserCrops();
        }

        fetchCrops();
    }, [])

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = (evt) => {
        evt.preventDefault();
        setDisableAddButton(true);
        setIsModalOpen(false);
    }

    const addCrop = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:8000/crop', {
            'userId': authUser,
            'cropId': evt.target.crop.value,
            'quantity': evt.target.quantity.value,
            'color': pastelColors[colorIndex],
            'date': evt.target.date.value
        })

        await getUserCrops();

        if (colorIndex >= pastelColors.length - 1) {
            setColorIndex(0);
            setItem('colorIndex', 0);
        } else {
            setColorIndex(prev => prev + 1);
            setItem('colorIndex', Number(getItem('colorIndex')) + 1);
        }

        closeModal(evt);
    }

    const toggleDisable = (evt) => {
        const newData = {...formInfo, [evt.target.name]: evt.target.value}
        setFormInfo(newData);
        
        if(newData.quantity && newData.crop && newData.date){
            setDisableAddButton(false);
        }
    }

    const handleTaskClick = (crop, stage, info) => {
        console.log(crop);
        console.log(stage);
        console.log(info);

        setIsTaskInfoOpen(true);
        setTaskInfo({ crop, stage, info });
    }

    return (
        <>
            <div className='w-[25%] h-[85vh] my-auto flex flex-col border rounded-lg bg-[#ffffff] shadow-md overflow-y-auto'>
                <h1 className='mx-auto mt-[2vh] mb-[4%] text-[2vw] text-[#2e2c2a] font-bold'>My Crops</h1>
                <button onClick={openModal} className='w-auto px-2 mx-auto rounded-xl text-[#63ab34] text-[1.1vw] hover:scale-110 transition ease-in-out'>+ Add crop</button>
                <h3 className="font-light text-xs ml-[4%] italic mt-[6%] mb-[2%]">Grouped by crop type</h3>
                {Object.keys(userCrops).map((crop, i) => (
                    <CropDropdown key={i} userCrops={userCrops} crop={crop} />
                ))}
            </div>
            <div className="w-full h-[85vh] my-auto border rounded-lg bg-[#ffffff] ml-[1%] pl-[2%] overflow-y-auto">
                <div className="mt-[2vh] flex items-center gap-[1%] w-[95%]">
                    <h2 className="text-[2vw] text-[#2e2c2a] font-bold">Tasks</h2>
                    <h2 className="text-[1.2vw] mb-[-1px] font-semibold">{formatDate(currentDate.date, currentDate.month, currentDate.year)}</h2>
                </div>
                {Object.keys(userCrops).map((crop, i) => (
                    <div key={i} className="">
                        <div className="">
                            <div>
                                <div className="w-[80%] h-[4vh] flex items-center gap-[1%] justify-end px-[1%]">
                                    <h3 className="text-[#2e2c2a] text-[1rem] font-semibold w-[15%] text-center">Start date</h3>
                                    <h3 className="text-[#2e2c2a] text-[1rem] font-semibold w-[15%] text-center">End date</h3>
                                </div>
                            </div>
                            {userCrops[crop].map((bunch, j) => (
                                <div key={j} >
                                    {Object.keys(bunch.schedule).map((key, k) => (
                                        <div key={k}>
                                            <button
                                                onClick={() => handleTaskClick(crop, key, bunch.schedule[key])}
                                                className="w-[80%] h-[5vh] border flex items-center gap-[1%] rounded-lg px-[1%] bg-[#f5f4f2] mb-[0.5%] bg-opacity-50 hover:bg-opacity-100"
                                                style={{ borderLeft: `solid 5px ${darkenColor(bunch.color, 20)}` }}
                                            >
                                                <h2>{getTaskIcon(key, '')}</h2>
                                                <h2>{capitalize(key)}</h2>
                                                <div className='text-xs border px-3 rounded-lg' style={{
                                                    backgroundColor: `rgba(${hexToRgb(bunch.color)}, 0.8)`,
                                                    borderColor: darkenColor(bunch.color, 20),
                                                    borderWidth: '1px',
                                                    borderStyle: 'solid'
                                                }}
                                                >{capitalize(crop)} - {bunch.quantity}</div>
                                                <div className="flex-1"></div>
                                                <h3 className="text-sm  w-[15%] text-center">{monthNames[Number(bunch.schedule[key].start_date.substring(5, 7)) - 1].substring(0, 3)} {bunch.schedule[key].start_date.substring(8)}</h3>
                                                <h3 className="text-sm  w-[15%] text-center">{monthNames[Number(bunch.schedule[key].end_date.substring(5, 7)) - 1].substring(0, 3)} {bunch.schedule[key].end_date.substring(8)}</h3>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content text-[#2e2c2a]'>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <h2 className="font-extrabold text-[1.5rem]">Add a crop to your garden</h2>
                        <hr className="mx-auto w-[100%] h-[2px] my-4 bg-[#63ab34]" />
                        <form onChange={toggleDisable} onSubmit={addCrop} className='font-semibold px-[4%] flex flex-col gap-[1rem]'>
                            <div className="flex items-center">
                                <div className='w-[40%]'>
                                    <label htmlFor='crop' className='text-[1.1rem]'>Select crop</label>
                                </div>
                                <select defaultValue='' name='crop' className='rounded-full rounded-xl w-[60%] text-sm font-medium p-2'>
                                    <option value='' disabled>Select a crop below</option>
                                    {crops.map(((crop, i) => (
                                        <option key={i} value={crop._id}>{capitalize(crop['name'])}</option>
                                    )))}
                                </select>
                            </div>

                            <div className="flex items-center">
                                <div className='w-[40%]'>
                                    <label htmlFor='crop' className='text-[1.1rem]'>Select quantity</label>
                                </div>
                                <input min='1' defaultValue='1' name='quantity' type='number' className='rounded-full rounded-xl w-[60%] text-sm font-medium p-2'/>
                            </div>
                            
                            <div className="flex items-center">
                            <div className='w-[40%]'>
                                    <label htmlFor='date' className='text-[1.1rem]'>Select start date</label>
                                </div>
                                <input name='date' type='date' className='rounded-full rounded-xl w-[60%] text-sm font-medium p-2'/>
                            </div>

                            <div className="flex justify-end gap-[5px]">
                                <button onClick={closeModal} className='w-[15%] p-1 border rounded-xl'>Cancel</button>
                                <button disabled={disableAddButton} className={`w-[15%] p-1 border rounded-xl ${disableAddButton ? 'bg-red-400 text-gray-200' : 'bg-red-500 text-white'}`}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isTaskInfoOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setIsTaskInfoOpen(false)}>&times;</span>
                        <h2 className="pb-2 font-bold text-[1.5rem]">{capitalize(taskInfo.crop)} - {capitalize(taskInfo.stage)}</h2>
                        <p>{monthNames[Number(taskInfo.info.start_date.substring(5, 7)) - 1].substring(0, 3)} {taskInfo.info.start_date.substring(8)} 
                            {' '}-{' '} 
                             {monthNames[Number(taskInfo.info.end_date.substring(5, 7)) - 1].substring(0, 3)} {taskInfo.info.end_date.substring(8)}
                        </p>
                        <p>{taskInfo.info.description}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default GardenCalendar;