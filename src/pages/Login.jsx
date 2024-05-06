import React from 'react'
import { useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState({email:"", password:""})


    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData => {
            return {
                ...prevData, [name]:value
            }
        }))
        console.log(formData);
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="flex justify-center">
            <div className="container flex flex-col items-center border max-w-[30rem] border-richblack-700 mt-32 p-10 rounded-md">
                <h2 className="text-4xl font-bold text-richblack-5">Login</h2>

                <div className="mt-3 w-[100%]">
                    <label htmlFor="email" className='text-richblack-5 inline-block mb-1'>Email</label>
                    <br />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="p-4 rounded-md text-richblack-5 bg-richblack-800 w-full"
                        value={formData.email}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mt-3 w-[100%]">
                    <label htmlFor="password"  className='text-richblack-5 inline-block mb-1'>Password</label>
                    <br />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="p-4 rounded-md text-richblack-5 bg-richblack-800 w-full"
                        value={formData.password}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mt-5">
                    <button type='submit' className='text-center px-6 py-2 rounded-md font-bold bg-yellow-50 text-black shadow-lg shadow-yellow-500/70 hover:bg-yellow-100'>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login