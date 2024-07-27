import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const YourPlants = () => {
    const [image, setImage] = useState(null);
    const [plants, setPlants] = useState([]);
    const { authUser, isLoggedIn } = useAuth();

    useEffect(() => {
        if(authUser) {
            const loadPlants = async () => {
                const response = await fetch(`http://localhost:8000/user/plants/${authUser}`, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => setPlants(data.plants));
            }    
            loadPlants();
        }
    }, [authUser])

    const handleFileChange = async (evt) => {
        setImage(evt.target.files[0])
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(!isLoggedIn){
            alert('must be logged in!');
        } else {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('user', authUser);
            
            try {
                const uploadRes = await fetch('http://localhost:8000/plant/upload', {
                    method: 'POST',
                    body: formData
                });
                
                
                const plantRes = await fetch(`http://localhost:8000/user/plants/${authUser}`, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => setPlants(data.plants));
            
            } catch(err){
                console.log(err);
            }
        }
    }

    return (
        <>
            <div className='w-[100vw] border h-[6vh] flex items-center justify-center'>
                <Link className='w-[25%] text-center' to='/'>← Go Back</Link>
                <div className='flex-1'></div>
            </div>
            <div className='flex-1 w-full border flex flex-row'>
                <div className='h-[100%] w-[25%] p-4 border flex flex-col'>
                    <h2 className='text-center'>Your Plants</h2>

                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <input onChange={handleFileChange} type='file' name='image' />
                        <button>Add Plant</button>

                    </form>
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

export default YourPlants;