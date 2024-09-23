import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PlantPot from '../assets/images/white-pot.png'
import { Link } from 'react-router-dom';

const LandingPage = ({ forwardRef, scrollToSection }) => {
    return (
        <div>
            <div ref={forwardRef} id='home' className='h-fit text-[#285a34] font-semibold font-raleway text-center '>
                <div className='pt-[8vh]'></div>
                <div className='h-full flex flex-col items-center mt-[6vh] '>
                        <div className='flex flex-col'>
                            <h2 className='font-bold text-[2.5rem] lg:text-[3rem] font-alegreya'>Introducing Flourish</h2>
                            <h3 className='italic text-[1.5rem] font-alegreya'>Grow with purpose, bloom with care</h3>
                        </div>
                        <img className='h-[60vh] max-w-full' src={PlantPot} />
                    <div className='flex gap-[4vw]'>
                        <Link to='/register' >
                            <button onClick={() => scrollToSection('about')} className='w-[35vw] h-[5vh] max-w-[200px] text-white rounded-lg mt-[2vh] border-2 hover:opacity-90 bg-[#285a34] border-slate-800 flex gap-[1vw] justify-center items-center shadow-md'>
                                <h2>Get Started</h2>
                                <ArrowForwardRoundedIcon className='scale-90' fontSize='small' />
                            </button>
                        </Link>
                        <button onClick={() => scrollToSection('about')} className='w-[30vw] h-[5vh] max-w-[200px] rounded-lg mt-[2vh] border-2  bg-[#2D2327] border-slate-800 flex justify-center items-center shadow-md'>
                            <h2 className='text-white'>Learn More</h2>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;