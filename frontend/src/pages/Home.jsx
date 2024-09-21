import React, { useRef, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PlantPot from '../assets/images/white-pot.png'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Link } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const Home = () => {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const contactRef = useRef(null);
    const [activeSection, setActiveSection] = useState('home');

    const sections = [
        { id: 'home', label: 'Home', ref: homeRef },
        { id: 'about', label: 'About', ref: aboutRef },
        { id: 'features', label: 'Features', ref: featuresRef },
        { id: 'contact', label: 'Contact', ref: contactRef }
    ];

    const scrollToSection = (sectionId) => {
        const section = sections.find(sec => sec.id === sectionId);
        section.ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id); 
                    }
                });
            },
            { threshold: 1 } 
        );

        sections.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            sections.forEach(({ ref }) => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, [sections]);

    return (
        <div className=''>
            <NavBar
                sections={sections}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            <div ref={homeRef} id='home' className='h-[92vh] text-[#285a34] font-semibold font-raleway text-center border-black border-2'>
                <div className='flex flex-col items-center mt-[5vh] '>
                    <h2 className='font-bold text-[2.25rem]'>Introducing Flourish</h2>
                    <h3 className='text-[1.3rem]'>Grow with purpose, bloom with care</h3>
                    <img className='max-w-[500px]' src={PlantPot} />
                    <div className='flex gap-[4vw]'>
                        <Link to='/register' >
                            <button onClick={() => scrollToSection('about')} className='w-[30vw] h-[5vh] rounded-lg mt-[2vh] border-2 hover: hover:opacity-90 bg-[#285a34] border-slate-800 flex justify-center items-center'>
                                <h2 className='text-white'>Get Started</h2>
                            </button>
                        </Link>

                        <button onClick={() => scrollToSection('about')} className='w-[30vw] h-[5vh] rounded-lg mt-[2vh] border-2  hover:opacity-90 bg-[#2D2327] border-slate-800 flex justify-center items-center'>
                            <h2 className='text-white'>Learn More</h2>
                        </button>


                        
                    </div>
                </div>
            </div>
            <div ref={aboutRef} id='about' className='h-[75vh]'>About</div>
            <div ref={featuresRef} id='features' className='h-[75vh]'>Features</div>
            <div ref={contactRef} id='contact' className='h-[75vh]'>Contact</div>
        </div>
    );
};

export default Home;
