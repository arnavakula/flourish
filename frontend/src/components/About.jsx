const About = ({ forwardRef }) => {
    return (
        <div ref={forwardRef} id='about' className='border-[2px] border-[#ddd0c8] font-source text-center flex flex-col gap-[2vh]'>
            <h2 className='font-bold text-[2.5rem] lg:text-[3rem] mt-[8vh] text-[#285a34] font-alegreya'>About Flourish</h2>

            <div className='px-6 mt-[1vh] flex flex-col gap-[3vh] text-[1.1rem] lg:text-[1.3rem] text-slate-800'>
  
                <div className='flex justify-center'>
                <iframe
                        src='https://www.youtube.com/embed/ye0ETYfRlrM'
                        className='w-[70vw] md:w-[50vw] h-[30vh] lg:h-[50vh]'
                    />
                </div>


                <p className='w-[70vw] md:w-[60vw] text-left mx-auto'>Flourish is an AI-driven garden planning and management tool. With Florish, create mock gardeners and get crop growth timelines with conversational advice at every stage, tailored to even first-time gardeners.</p>
            </div>
        </div>
    )
}

export default About;