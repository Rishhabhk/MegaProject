import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homePage-explore"
import HighlightText from './HighlightText'



const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag)
    const [courses, setCourses] = useState(HomePageExplore[0].courses);

    const setCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((item) => item.tag === value)
        console.log(result);
        setCourses(result[0].courses)
    }

    return (
        <div className='mt-10 relative w-full pb-56'>
            <div className='text-center'>
                <h2 className='text-4xl font-bold mb-3'>Unlock the <HighlightText text={"Power of Code"} /></h2>
                <p className='text-richblack-300 font-semibold'>Learn to build anything you can imagine</p>
            </div>
            <div className='flex flex-row bg-richblack-800 w-fit m-auto px-1 py-1 rounded-full mt-4 transition-all duration-200 '>
                {
                    HomePageExplore.map((item, index) => {
                        return (
                            <button key={index}
                                onClick={() => setCards(item.tag)}
                                className={`hover:bg-richblack-900 rounded-full px-4 py-2 mx-1 transition-all duration-300 ${item.tag === currentTab ? "bg-richblack-900 text-white" : "text-richblack-200"}`}>
                                {item.tag}
                            </button>
                        )
                    })
                }
            </div>

            <div className='flex flex-row flex-wrap justify-center gap-10 mt-7 absolute left-0 -bottom-30'>
                {
                    courses.map((course, index) => {
                        return (
                            <div className='px-8  flex flex-col  h-72 rounded-md  justify-between bg-richblack-800 text-richblack-300 w-3/12 min-w-[300px]' key={index}>
                                <div className='mb-4 pt-6'>
                                    <h2 className='font-bold text-white mb-2 text-lg'>{course.heading}</h2>
                                    <p>{course.description}</p>
                                </div>
                                <div className='pb-4 flex flex-row justify-between border-t border-richblack-500 pt-4'>
                                    <p>{course.level}</p>
                                    <p>{`${course.lessonNumber} Lessons`} </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>



        </div>
    )
}

export default ExploreMore