import { useEffect, useState } from "react";
import '../assets/styles/GardenCalendar.css';
import axios from "axios";
import useAuth from "../hooks/useAuth";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useLocalStorage from "../hooks/useLocalStorage";

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

    const makeSchedule = async () => {
        const response = await axios.post('http://localhost:8000/crop/schedule', {
            userCrops
        }, {withCredentials: true})
    }

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

    console.log(userCrops);

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
        if (evt.target.value != '') {
            setDisableAddButton(false);
        }
    }

    return (
        <>
            <div className='w-[15%] h-full border-2 border-orange-800 flex flex-col'>
                <h1 className="mx-auto mt-[4%]">My Crops</h1>
                <button onClick={openModal}>+ Add crop</button>
                <button onClick={makeSchedule}> Test API </button>
                <hr className="mx-auto w-[90%] h-[1px] my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                {Object.keys(userCrops).map((crop, i) => (
                    <div key={i} className="ml-[4%] py-3">
                        <div className="flex justify-start gap-[1%] items-center">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <h2>{capitalize(crop)}</h2>
                        </div>
                        <div className="ml-[10%]">
                            {userCrops[crop].map((bunch, j) => (
                                <div key={j} >
                                    <h2 style={{backgroundColor: `${bunch.color}`}} className={`border w-[90%] mx-auto text-center rounded-lg`}>{capitalize(crop)} - {bunch.quantity} </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <h2 className="pb-4 font-bold text-[1.5rem]">Add a crop to your garden</h2>
                        <form onSubmit={addCrop}>
                            <label htmlFor='crop' className="p-2">Select crop</label>
                            <select onChange={toggleDisable} defaultValue='' name='crop'>
                                <option value='' disabled>Select a crop below</option>
                                {crops.map(((crop, i) => (
                                    <option key={i} value={crop._id}>{crop['name']}</option>
                                )))}
                            </select>
                            <br />
                            <label className='p-2' htmlFor='quantity'>Select quantity</label>
                            <input name='quantity' type='number' />
                            <br />
                            <label className='p-2' htmlFor='date'>Select start date</label>
                            <input name='date' type='date' />

                            <div className="flex justify-end gap-[5px]">
                                <button onClick={closeModal} className='w-[15%] p-1 border rounded-xl'>Cancel</button>
                                <button disabled={disableAddButton} className={`w-[15%] p-1 border rounded-xl ${disableAddButton ? 'bg-red-400 text-gray-200' : 'bg-red-500 text-white'}`}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default GardenCalendar;