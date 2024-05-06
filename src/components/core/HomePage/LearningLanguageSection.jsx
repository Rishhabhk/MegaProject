import React from 'react';
import HighlightText from './HighlightText';
import image from "../../../assets/threeImageUpdated.png"
import Button from './Button';

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col justify-center mt-28 pb-20'>
        <div className='flex flex-col gap-3 m-auto text-center w-6/12'>
            <h2 className='text-4xl font-bold'>Your Swiss knife for <HighlightText text={"learning any language"} /></h2>
            <p className='text-xl'>Using Spinn, making multiple languages easy with 20+ languages, realistic voice-over, progress tracking, custom schedule, and more.</p>
        </div>
        <div className='m-auto w-8/12 drop-shadow-sm'>
            <img  src={image} alt="" />
        </div>
        <div className='m-auto mt-8'>
            <Button active={true} linkto={"/signUp"}>
                Learn more
            </Button>
        </div>
    </div>
  );
}

export default LearningLanguageSection;
