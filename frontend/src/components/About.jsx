const About = ({ forwardRef }) => {
    return (
        <div ref={forwardRef} id='about' className='border-[2px] border-[#ddd0c8] font-source'>
            <h2 className='font-bold text-[2.25rem] mt-[8vh] text-center text-[#285a34] font-alegreya'>About Flourish</h2>
            
            <div className='px-6 mt-[1vh] flex flex-col gap-[3vh] text-[1.2rem]'>
                <p>Flourish is an AI-driven garden planning and management tool.</p>
  
                <div className='flex justify-center'>
                <iframe
                        src='https://www.youtube.com/embed/ye0ETYfRlrM'
                      
                        className='border-2 border-black w-[80vw] h-[30vh]'
                    />
                </div>


                <p>With Florish, create mock gardeners and get crop growth timelines with conversational advice at every stage, tailored to even first-time gardeners.</p>
            </div>
        </div>
    )
}

export default About;