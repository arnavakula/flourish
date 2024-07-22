import { Link } from 'react-router-dom';

const YourPlants = () => {
    return (
        <>
            <div className='w-[100vw] border h-[6vh] flex items-center justify-center'>
                <Link className='w-[25%] text-center' to='/'>← Go Back</Link>
                <div className='flex-1'></div>
            </div>
            <div className='flex-1 w-full border flex flex-row'>
                <div className='h-[100%] w-[25%] p-4 border'>
                    <h2 className='text-center'>Your Plants</h2>
                </div>
                <div className='h-[100%] w-[75%] p-4 border'>
                    <h2 className='text-center'>Your Plants</h2>
                </div>


            </div>
        </>
    );
}

export default YourPlants;