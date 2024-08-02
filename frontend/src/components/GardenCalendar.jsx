import { useState } from "react";
import '../assets/styles/GardenCalendar.css';

const seedCrops = [
    "Wheat",
    "Rice",
    "Corn",
    "Tomato",
    "Potato",
    "Lettuce",
    "Apple",
    "Banana",
    "Grapes",
    "Soybean",
    "Pea",
    "Basil",
    "Mint",
    "Almond",
    "Sunflower"
]
  

const GardenCalendar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const addCrop = () => {

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
                        <label htmlFor='crop' className="p-2">Select crop</label>
                        <select defaultValue='' name='crop'>
                            <option value='' disabled>Select a crop below</option>
                            {seedCrops.map((crop, i) => (
                                <option key={i} value={crop}>{crop}</option>
                            ))}
                        </select>
                        <br />
                        <div className="flex justify-end gap-[5px]">
                            <button onClick={closeModal} className='w-[15%] p-1 border rounded-xl'>Cancel</button>
                            <button onClick={addCrop} className='w-[15%] p-1 border rounded-xl'>Add</button>
                        </div>
                    </div>
                </div>
        )}
        </>
    )
}

export default GardenCalendar;