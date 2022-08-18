import React, {Component} from 'react';
import {Link} from "react-router-dom";


//We can use a logo to import to go to the HomePage and for the Profile and Checkout
const Navbar =() => {
    return (
    <div className='bg-gray-300 flex justify-between items-center border border-solid p-4'>
        <h1 className='full text-3xl font-bold'>G-Bay</h1>
        <input className="form-control mx-auto rounded w-60" type="search" placeholder="Search" aria-label="Search"/>
        <ul className='flex'>
            <li>
                <Link className='p-4' to='/'>Home</Link>
                <Link className='p-4' to='/profile'>Profile</Link>
                <Link className="p-4" to='/checkout'>Checkout</Link>

            </li>

        </ul>
    </div>
    )
}

export default Navbar;