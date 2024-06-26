import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-blue-50 via-blue-200 to-blue-50 text-transparent bg-clip-text'>
        {" "}{text}{" "}
        </span>
  )
}

export default HighlightText