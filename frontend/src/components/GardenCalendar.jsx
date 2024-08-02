import { useEffect, useState } from "react";
import '../assets/styles/GardenCalendar.css';
import data from '../seed/seed.json';
import axios from "axios";
import useAuth from "../hooks/useAuth";

const GardenCalendar = () => {
    const { authUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disableAddButton, setDisableAddButton] = useState(true);
    const [crops, setCrops] = useState([]);
    const [userCrops, setUserCrops] = useState([]);

    useEffect(() => {
        const fetchAllCrops = async () => {
            const response = await axios.get('http://localhost:8000/crop', { withCredentials: true });
            setCrops(response.data.crops);
        }

        fetchAllCrops();
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
            'cropId': evt.target.crop.value
        })

        closeModal(evt);
    }

    const toggleDisable = (evt) => {
        if(evt.target.value != ''){
            setDisableAddButton(false);
        }
    }
    
    return (
        <>
        <div className='w-[15%] h-full border-2 border-orange-800 flex flex-col items-center'>
            <h1>My Crops</h1>
            <button onClick={openModal}>+ Add crop</button>
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