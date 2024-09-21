import React, { useRef, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';


import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LandingPage from '../components/LandingPage';
import Features from '../components/Features';
import About from '../components/About';
import Contact from '../components/Contact';

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
            <NavBar sections={sections} activeSection={activeSection} scrollToSection={scrollToSection} />

            <LandingPage forwardRef={homeRef} scrollToSection={scrollToSection} />

            <About forwardRef={aboutRef} />

            <Features forwardRef={featuresRef} />

            
            <Contact forwardRef={contactRef}/>
        </div>
    );
};

export default Home;
