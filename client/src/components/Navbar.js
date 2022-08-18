import React from 'react';
import {Link} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {BsSearch} from "react-icons/bs"
import {IoHomeSharp} from "react-icons/io5"
import {FaShoppingCart} from "react-icons/fa"
import logo from "../images/logo5.PNG"
//We can use a logo to import to go to the HomePage and for the Profile and Checkout
const Navbar = () => {
    return (
        <div className='bg-gray-300 flex justify-between items-center border border-solid p-4'>
            <Link to="/">
                <img className='w-16 h-16'
                    src={logo}
                    alt="logo"
                />
            </Link>
                <div className="flex justify-between">
                    <input className="form-control mx-0 rounded w-60" type="search" placeholder="Search"
                           aria-label="Search"/>
                    <BsSearch className="mt-1 ml-2"/>
                </div>
                <ul className='flex'>
                    <li className='flex flex-row'>
                        <Link className='p-4' to='/'><IoHomeSharp/></Link>
                        <Link className='p-4' to='/profile'><CgProfile/></Link>
                        <Link className="p-4" to='/checkout'><FaShoppingCart/></Link>

                    </li>

                </ul>
        </div>
)
}

export default Navbar;