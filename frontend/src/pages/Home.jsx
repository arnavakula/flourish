import React, { useRef, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

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
        <div className="bg-[#d5d0c8]">
            <NavBar
                sections={sections}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            <div ref={homeRef} id="home" className="h-[75vh]">Home</div>
            <div ref={aboutRef} id="about" className="h-[75vh]">About</div>
            <div ref={featuresRef} id="features" className="h-[75vh]">Features</div>
            <div ref={contactRef} id="contact" className="h-[75vh]">Contact</div>
        </div>
    );
};

export default Home;
