import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center px-6 py-2 rounded-md font-bold ${active ? "bg-yellow-50 text-black shadow-lg shadow-yellow-500/70 hover:shadow-yellow-100/100" : " text-white bg-richblack-800 border-r-2 border-b-2 border-richblack-600"} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}

export default Button