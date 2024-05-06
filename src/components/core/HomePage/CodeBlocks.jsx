import React from 'react'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({ position, heading, subHeading, ctabtn1, ctabtn2, codeblock, bgGradient, codeColor, borderColor }) => {
    return (
        <div className={`flex ${position} gap-10 mt-24 justify-between `}>

            {/* section 1 */}
            <div className='flex flex-col gap-6 w-6/12'>
                {heading}
                <div className='text-richblack-300 '>
                    {subHeading}
                </div>
                <div className='flex flex-row gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex flex-row gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* section 2 */}
            <div className={`relative flex flex-row w-5/12 min-w-[500px] rounded-2xl  h-full border-r border-b ${borderColor}`}>
                <div className={`absolute ${bgGradient} rounded-full w-[250px] h-[200px] -left-10 opacity-55 -top-4 blur-3xl`}>
                </div>
                <div className='flex flex-row w-full backdrop-blur-3xl p-5 rounded-2xl '>
                    <div className='text-center  flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                    </div>
                    <div className={`w-[90%] flex flex-col font-mono ${codeColor}  z-10 px-2`}>
                        <TypeAnimation
                            sequence={[codeblock, 2000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            style={{
                                whiteSpace: "pre-line",
                                display: "block"
                            }}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks