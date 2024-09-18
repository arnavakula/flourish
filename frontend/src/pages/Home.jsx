import React, { useRef } from "react";
import NavBar from "../components/NavBar";
import background1 from '../assets/images/white-pot.png'

const Home = () => {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-[#d5d0c8] min-h-[100vh]">
            <NavBar scrollToSection={scrollToSection} section1Ref={section1Ref} section2Ref={section2Ref} section3Ref={section3Ref} />

            <div id="section1" ref={section1Ref} className="h-[70vh] flex flex-row items-center">
                <div className="w-[40%] mb-[10%] flex flex-col gap-[0.75em] ml-[5%]">
                    <h2 className="ml-[4rem] text-[4vw] text-[#0f491e] font-medium">Introducing Flourish</h2>
                    <h2 className="ml-[4rem] text-[2vw] text-[#0f491e] font-medium">Grow with purpose, bloom with care</h2>
                    <p className="text-[#446e4d] ml-[4rem] mt-[1vh] text-[1.5vw]">
                        Keep track of your garden's progress, receive tailored care schedules, and watch as your plants thrive.
                    </p>
                </div>
                <img className='ml-[5%] w-[40%] mb-[10%]' src={background1}></img>
            </div>

            <div className='h-[75vh] bg-white'>
                <div id="section2" ref={section2Ref} className="flex flex-row">
                    <div className="w-[40%] pt-[5vh] flex flex-col gap-[0.75em]">
                        <h2 className="ml-[4rem] text-[4vw] text-[#0f491e] font-medium">Watch a demo</h2>

                    </div>
                </div>
                <div className="w-[100vw]">
                    <iframe
                        src='https://www.youtube.com/embed/ye0ETYfRlrM'
                        allow='autoplay; encrypted-media'
                        allowfullscreen
                        title='video'
                        className='border-2 border-black w-[50vw] h-[50vh] mx-auto'
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
