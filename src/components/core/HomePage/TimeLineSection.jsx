import React from 'react'
import Logo1 from "../../../assets/badge.png"
import Logo2 from "../../../assets/cap.png"
import Logo3 from "../../../assets/diamond.png"
import Logo4 from "../../../assets/solution.png"
import TimelineImg from "../../../assets/timeline.jpg"


const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Guiding the company towards success.",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Taking ownership and meeting commitments.",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "Adapting to change and seizing opportunities.",
    },
    {
        Logo: Logo4,
        heading: "Problem-solving",
        Description: "Finding creative solutions to challenges.",
    }
]


const TimeLineSection = () => {
    return (
        <div className=' mt-20 pb-20'>
            <div className='flex flex-row m-auto gap-28 w-fit items-center'>
                <div className='w-5/12 flex flex-col gap-10'>
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-6' key={index}>
                                    <div className='w-[50px] h-[50px] rounded-full p-3 bg-white flex items-center justify-center'>
                                        <img src={element.Logo} alt="" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h2 className='font-semibold' >{element.heading}</h2>
                                        <p>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='relative w-7/12'>
                    <div className='absolute right-0 rounded-full opacity-95 blur-3xl bg-caribbeangreen-600 w-[250px] h-[200px]'></div>
                    <div className='absolute left-0 -bottom-10 rounded-full opacity-95 blur-3xl bg-blue-100 w-[250px] h-[200px]'></div>
                    <div className='absolute w-full h-full bg-white -right-3  -bottom-3'></div>
                    <div className='absolute p-8 left-[50%] bottom-0 -translate-x-[50%] translate-y-[50%] z-20 flex flex-row bg-caribbeangreen-800 text-richblack-25'>
                        <div className='flex flex-row gap-6 border-r pr-6 border-richblack-400 '>
                            <p className='text-5xl'> 10</p>
                            <p>YEARS OF EXPREIENCES</p>
                        </div>
                        <div className=' flex flex-row gap-6 pl-6'>
                            <p className='text-5xl'>250</p>
                            <p>TYPES OF COURSES</p>
                        </div>
                    </div>
                    <div className='relative h-[400px] z-10'>
                        <img className='h-[100%] ' src={TimelineImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeLineSection