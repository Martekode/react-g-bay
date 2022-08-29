import {Link} from "react-router-dom";
import Avatar from 'react-avatar';
import {useAuth0} from '@auth0/auth0-react';

export default function AuthenticatedProfile() {
    const {isAuthenticated, user} = useAuth0();


    return (
        isAuthenticated && (
            <div>
                <div className='w-100% h-screen'>
                    <p className='text-2xl ml-24 mt-24'>Profile Pic</p>
                    <div className='absolute left-1/2 border-2 w-fit h-52 mb-24'>
                        <h1>Product-List with everything you are Selling</h1>
                    </div>
                    <div className=' w-52 h-52 ml-10'>
                        <Avatar src={user?.picture} className='rounded-full scale-150 ml-7 mt-8'/>
                        <div className='static flex flex-col mt-32 ml-10'>
                            <div className='p-6'>{user?.nickname}</div>
                            <div className='p-6'>{user?.email}</div>
                            <Link to="/sell">
                                <button className='hover:bg-secondary border-2 rounded-full w-32 hover:text-primary'>Sell products</button>
                            </Link>
                        </div>
                    </div>
                    <div className='absolute left-1/2 border-2 w-fit h-52 mt-12'>
                        <h1>Wishlist for items that user wants for Selling</h1>
                    </div>
                </div>
            </div>
        )
    )
}