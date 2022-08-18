import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import Avatar from 'react-avatar';

function Profile() {
    return (
        <div>
            <Navbar />
            <div className='border border-solid border-l-black w-100% h h-screen'>
                <p className='text-2xl ml-24 mt-24'>Profile Pic</p>
                <div className='absolute left-1/2 border-2 w-fit h-52 mb-24' >
                    <h1>Product-List with everything you are Selling</h1>
                </div>
                    <div className=' w-52 h-52 ml-10'>
                        <Avatar name='foo bar' className='rounded-full scale-150 ml-7 mt-8'/>
                        <div className='static flex flex-col mt-40 ml-10'>
                            <div className='p-6'>Name</div>
                            <div className='p-6'>Email</div>
                         <Link to="/sell"><div className='p-6'>Sell products</div></Link>
                        </div>
                    </div>
                <div className='absolute left-1/2 border-2 w-fit h-52 mt-12' >
                    <h1>Wishlist for items that user wants for Selling</h1>
                </div>
            </div>


            <Footer />
        </div>
    )
}
export default Profile