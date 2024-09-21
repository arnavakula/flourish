import '../assets/styles/Features.css';
import Calendar from '../assets/images/calendar.png';
import Advice from '../assets/images/advice.png';
import Community from '../assets/images/community.png';

const Features = ({ forwardRef }) => {
    const features = [
        {title: 'Customized care schedules', image: Calendar},
        {title: 'Conversational advice', image: Advice},
        {title: 'Community forum', image: Community}
    ]
    return (
        <div ref={forwardRef} id='features' className='h font-raleway border-black border-2 '>
            <h2 className='font-bold text-[2.25rem] mt-[8vh] text-center'>Features</h2>

            <div className='flex flex-col gap-[2vh] px-3 font-alegreya'>
                {features.map((feature, i) => (
                    <div key={i} className={`flex flex-col gap-[1vh] ${i % 2 === 0 ? 'image-3d' : 'image-3d-rev items-end'}`}>
                        <h3 className='text-[1.5rem]'>{feature.title}</h3>
                        <img src={feature.image} className='shadow-md w-[90%]' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features;