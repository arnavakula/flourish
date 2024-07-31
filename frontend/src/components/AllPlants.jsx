import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';

const AllPlants = () => {
    const [plants, setPlants] = useState([]);
    const { authUser } = useContext(AuthContext);

    useEffect(() => {
        if(authUser) {
            const loadPlants = async () => {
                const response = await axios.get(`http://localhost:8000/plant`, { withCredentials: true })
                setPlants(response.data.plants);
            }    
            loadPlants();
        }
    }, [authUser])

    return (
        <>
            <div className='w-[100vw] border h-[6vh] flex items-center justify-center'>
                <Link className='w-[25%] text-center' to='/'>← Go Back</Link>
                <div className='flex-1'></div>
            </div>
            <div className='flex-1 w-full border flex flex-row'>
                <div className='h-[100%] w-[25%] p-4 border flex flex-col'>
                    <h2 className='text-center'>All Plants</h2>

                    
                </div>
                <div className='h-[100%] w-[75%] border grid grid-cols-2 overflow-y-scroll h-screen'>
                    {plants.map((plant, i) => (
                        <div key={i} className='border relative pb-[100%]'>
                            <img className='absolute top-0 left-0 w-full h-full object-cover' src={plant.location} alt={`Plant ${i}`} />
                        </div>
                    ))}

                </div>


            </div>
        </>
    );
}

export default AllPlants;