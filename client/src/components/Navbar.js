import React from "react";
import {Link} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {BsSearch} from "react-icons/bs"
import {IoHomeSharp} from "react-icons/io5"
import {FaShoppingCart} from "react-icons/fa"
import logo from "../images/blacklogo.png"
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

//We can use a logo to import to go to the HomePage and for the Profile and Checkout
const Navbar = () => {
    const {isLoading,error} = useAuth0();
    return (
        <div className='bg-primary flex justify-between items-center p-4'>
            <Link to="/">
                <img className='w-16 h-16'
                    src={logo}
                    alt="logo"
                />
            </Link>

                {/*<div className="flex justify-center items-center">*/}
                {/*    <input className="bg-background focus:outline-none border border-secondary form-control mx-0 rounded w-60" type="search" placeholder="Search"*/}
                {/*            aria-label="Search"/>*/}
                {/*    <BsSearch className="mt-1 ml-2"/>*/}
                {/*</div>*/}
                <ul className='flex'>
                    <li className='flex flex-row'>
                    {error && <p>Authentication Error</p>}
                    {!error && isLoading && <p>Loading...</p>}
                    {!error && !isLoading && (
                        <>
                            <LoginButton/>
                            <LogoutButton/>
                        </>
                        )}
                        <Link className='p-4' to='/profile'><CgProfile/></Link>
                        <Link className='p-4' to='/'><IoHomeSharp/></Link>
                        <Link className="p-4" to='/checkout'><FaShoppingCart/></Link>
                    </li>
                </ul>
        </div>
)
}

export default Navbar;