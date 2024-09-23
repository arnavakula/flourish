import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const Contact = ({ forwardRef }) => {
    const contactOptions = [
        {icon: <LocalPhoneRoundedIcon fontSize='medium' color='#285a34'/>, print: 'Phone: 650-766-1576'},
        {icon: <EmailRoundedIcon fontSize='medium' color='#285a34'/>, print: 'Mail: akula.arnav@gmail.com'}
    ]
    return (
        <div ref={forwardRef} className='contact mb-[3vh] text-[1.1rem]'>  
            <div className='w-[90vw] max-w-[600px] bg-white mx-auto rounded-3xl mt-[8vh] p-4 lg:p-6 font-source shadow-lg'>
                <h2 className='font-bold text-[2.5rem] lg:text-[3rem] text-[#285a34] font-alegreya'>Contact Us</h2>
                <p className='mb-[2vh]'>Please contact for any questions or to learn more about Flourish!</p>
                
                {contactOptions.map((contact, i) => (
                    <div className='flex gap-[2vw] items-center text-[#285a34]'>
                        {contact.icon}
                        <p className='text-black'>{contact.print}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contact;