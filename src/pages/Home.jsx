import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/homePageVideo.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';

const Home = () => {
  return (
    <div className='w-full'>
      {/* section1 */}
      <div className='relative m-auto mt-6 flex flex-col w-11/12 items-center text-white justify-between '>
        <Link to={"/signUp"}>
          <div className='flex flex-row flex- items-center px-8 py-2 bg-richblack-800 rounded-full transition-all duration-200 hover:scale-95 hover:bg-richblack-900 border-2 border-richblack-800 gap-2 text-richblack-300 font-thin'>
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </Link>

        <div className='text-4xl mt-4 text-center'>
          Empower your future with
          <HighlightText text={"Coding skills"} />
        </div>

        <div className='w-8/12 mt-3 text-richblack-300 text-center'>
          Start your coding journey today and unlock the potential of tomorrow. Whether you dream of building apps, websites, or software solutions, we've got the resources and expertise to guide you every step of the way.
        </div>

        <div className='flex flex-row gap-7 mt-6'>
          <CTAButton active={true} linkto={"/signUp"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className='relative w-11/12 mt-8 flex flex-row justify-cente '>
          <div className='absolute bg-richblack-700  left-3 top-3 w-full h-full '></div>
          <video muted loop autoPlay className='z-10'>
            <source src={Banner} type='video/mp4'></source>
          </video>
        </div>

        <div className='w-11/12 mt-20'>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock your <HighlightText text={"coding potential"} /> with our online courses
              </div>
            }
            subHeading={"Unleash your creativity and problem-solving skills with our comprehensive coding curriculum. Whether you're a beginner or an experienced programmer, our courses cater to all levels and empower you to achieve your goals."}
            ctabtn1={
              {
                btnText: "Try it yourself",
                linkto: "/signUp",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn more",
                linkto: "/login",
                active: false
              }
            }
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>My Basic HTML Page</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n<p>This is a basic HTML page.</p>\n</body>\n</html>`}
            codeColor={"text-yellow-100"}
            bgGradient={"bg-yellow-300"}
            borderColor={"border-yellow-300"}
          />
        </div>

        <div className='w-11/12 mt-20 mb-10'>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Start <HighlightText text={"coding"} /> in seconds with us easily
              </div>
            }
            subHeading={"Get started on your coding journey effortlessly with our user-friendly platform. Our interactive tutorials and step-by-step guides make learning to code a breeze, allowing you to focus on what matters most—writing great code."}
            ctabtn1={
              {
                btnText: "Continue lesson",
                linkto: "/signUp",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn more",
                linkto: "/login",
                active: false
              }
            }
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>My Basic HTML Page</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n<p>This is a basic HTML page.</p>\n</body>\n</html>`}
            codeColor={"text-blue-100"}
            bgGradient={"bg-blue-300"}
            borderColor={"border-blue-300"}
          />

        </div>
        
          <ExploreMore/>
        


      </div>


      {/* section2 */}
      <div className='bg-richblack-5'>

        <div className='section2_bg_grill w-full h-[333px] flex '>
          <div className='w-11/12 m-auto '>
            <div className='flex flex-row gap-7 justify-center items-center '>
              <CTAButton active={true} linkto={"signUp"}>
                <div className='flex fex-row gap-2 items-center'>
                  <p>Explore Full Catalog</p>
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"login"}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>

        <div className='bg-richblack-5 mt-32 w-8/12  m-auto'>
            <div className=' flex flex-row  gap-20 justify-center'>
              <div className='w-`6/12 text-4xl font-bold'>
                <p>Get the skills you need for a <HighlightText text={"job that is in demand"}/></p>
              </div>
              <div className='w-6/12 font-bold flex flex-col gap-4'>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut voluptatum deserunt non distinctio dicta.</p>
                <div className='w-fit'>
                  <CTAButton active={true} linkto={"/signUp"}>Learn more</CTAButton>
                </div>
              </div>
            </div>
        </div>

        <TimeLineSection/>
        <LearningLanguageSection/>
      </div>



      {/* section3 */}
      <div className='m-auto w-11/12'>
        <InstructorSection/>
      </div>


      {/* footer */}
    </div>
  )
}

export default Home;
