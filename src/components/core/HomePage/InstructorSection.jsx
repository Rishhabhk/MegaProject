import React from 'react'
import instrcutor from "../../../assets/instructor.jpg"
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
    return (
        <div className='flex flex-row gap-20 mt-20 mb-20 justify-center'>
            <div className='relative w-5/12'>
                <div className='absolute bg-white -left-3 -top-3 w-full h-full'></div>
                <img className='relative z-10' src={instrcutor} alt="" />
            </div>
            <div className='w-4/12'>
                <div className='flex flex-col justify-center h-full'>
                    <h2 className='text-white text-4xl font-bold'>Become an <HighlightText text={"instructor"} /></h2>
                    <p className='text-richblack-300 mt-6'>Instructors from around the world teach millions of students on
                        this platform. We provide the tools and skills to teach what you
                        love.
                    </p>
                    <div className='w-fit mt-12'>
                        <Button active={true} linkto={"/signUp"}>
                            <div className='flex flex-row gap-4 items-center'>
                                <p>Start Teaching today</p>
                                <FaArrowRight />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection