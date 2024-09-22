import '../assets/styles/Features.css';
import Calendar from '../assets/images/calendar.png';
import Advice from '../assets/images/advice.png';
import Community from '../assets/images/community.png';

const Features = ({ forwardRef }) => {
    const features = [
        {title: 'Customized care schedules', image: Calendar, desc: 'Tailor care routines for each plant based on its specific needs. Get personalized reminders to ensure your garden thrives all year long.'},
        {title: 'Conversational advice', image: Advice, desc: 'Get real-time about plant care, pest control, or more. It\'s like having a gardening expert in your pocket.'},
        {title: 'Community forum', image: Community, desc: 'Engage with like-minded gardeners, share your successes, and learn from others\' experiences. Grow together, one conversation at a time.'}
    ]

    return (
        <div ref={forwardRef} id='features' className='h font-source border-[#ddd0c8] border-2'>
            <h2 className='font-bold text-[2.5rem] lg:text-[3rem] mt-[8vh] text-center font-alegreya text-[#285a34]'>Features</h2>

            <div className='flex flex-col mt-[3vh] gap-[4vh] lg:gap-[6vh] px-3'>
                {features.map((feature, i) => (
                    <div key={i} className={`flex flex-col gap-[1.5vh] sm:gap-[2.5vh] px-4 md:items-start md:justify-end xl:justify-center ${i % 2 === 0 ? 'image-3d md:flex-row-reverse xl:mr-[10vw]' : 'image-3d-rev items-end md:flex-row xl:ml-[10vw]'}`}>
                        <div className='md:mt-[5vh] xl:w-[40%]'>
                            <h3 className='text-[1.5rem] lg:text-[2rem] font-semibold text-[#285a34]'>{feature.title}</h3>
                            <p className='hidden md:block lg:text-[1.3rem] text-slate-800'>{feature.desc}</p>
                        </div>
                        <img src={feature.image} className='shadow-md w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] border-black border-2' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features;