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
    const [disableAddButton, setDisableAddButton] = useState(true);
    
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = (evt) => {
        evt.preventDefault();
        setDisableAddButton(true);
        setIsModalOpen(false);
    }

    const addCrop = (evt) => {
        console.log(evt.target.crop.value);
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
                                {seedCrops.map((crop, i) => (
                                    <option key={i} value={crop}>{crop}</option>
                                ))}
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