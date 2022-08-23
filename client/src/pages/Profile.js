import {Link} from "react-router-dom";
import Avatar from 'react-avatar';

function Profile() {
    return (
        <div>
            <div className='w-100% h-screen'>
                <p className='text-2xl ml-24 mt-24'>Profile Pic</p>
                <div className='absolute left-1/2 border-2 w-fit h-52 mb-24' >
                    <h1>Product-List with everything you are Selling</h1>
                </div>
                    <div className=' w-52 h-52 ml-10'>
                        <Avatar name="Tim Broos" className='rounded-full scale-150 ml-7 mt-8'/>
                        <div className='static flex flex-col mt-32 ml-10'>
                            <div className='p-6'>Tim Broos</div>
                            <div className='p-6'>tim.broos@becode.org</div>
                         <Link to="/sell"><div className='p-6 hover:text-hovers' >Sell products</div></Link>
                        </div>
                    </div>
                <div className='absolute left-1/2 border-2 w-fit h-52 mt-12' >
                    <h1>Wishlist for items that user wants for Selling</h1>
                </div>
            </div>
        </div>
    )
}
export default Profile