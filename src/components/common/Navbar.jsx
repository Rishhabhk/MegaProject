import React, { useEffect, useState } from 'react'
import Logo from "../../assets/MEgaproject (1).png"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { LuShoppingCart } from "react-icons/lu";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { FaChevronDown } from "react-icons/fa";


const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const location = useLocation();

    // const subLinks = ["python", "web dev"]
    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.allCategory);
        }
        catch (error) {
            console.log("coould not fetch the category list");
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, [])


    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <div className='border-b border-richblack-700 text-richblack-25'>
            <div className='w-11/12 flex flex-row justify-between items-center m-auto h-[60px]'>

                {/* logo */}
                <Link to={"/"}>
                    <img src={Logo} width={160} height={42} loading='lazy' alt="" />
                </Link>

                {/* navlinks */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((item, index) => (
                                <li key={index}>
                                    {
                                        item.title === "Catalog" ?
                                            <div className='relative group cursor-pointer'>
                                                <div className='flex gap-x-2 items-center'>
                                                    <p className='text-richblack-300 '>{item.title}</p>
                                                    <FaChevronDown className='text-richblack-300' />
                                                </div>
                                                <div className='invisible opacity-0 bg-richblack-5 text-richblack-900  capitalize absolute top-10 -left-9 z-10 p-2 rounded-md group-hover:visible group-hover:opacity-100 transition-all duration-300 '>
                                                    {
                                                        subLinks.length ? (
                                                            subLinks.map((link, index) => (
                                                                <p key={index} className='px-3 py-2 hover:bg-richblack-50 rounded-md cursor-pointer whitespace-nowrap text-'>
                                                                    <Link to={"/login"}>{link.name}</Link>
                                                                </p>
                                                            )))
                                                            :
                                                            (<div></div>)
                                                    }
                                                    <div className='h-2 w-2  bg-richblack-5 rotate-45 absolute -top-1 left-20'></div>
                                                </div>
                                            </div>
                                            :
                                            <Link to={item.path}>
                                                <p className={matchRoute(item.path) ? "text-richblack-5" : "text-richblack-300"}>
                                                    {item.title}
                                                </p>
                                            </Link>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* logn/signup/dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <LuShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <div className='flex gap-x-2'>
                                <Link to={"/login"}>
                                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                        Log in
                                    </button>
                                </Link>
                                <Link to={"/sign-up"}>
                                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }

                </div>
            </div>
        </div >
    )
}

export default Navbar