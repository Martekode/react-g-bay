import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Checkout() {
    return (
        <div>
            <Navbar />
            <div className='border border-solid border-l-black w-100% h h-screen'>
                <div className='flex items-center border-2 h-48 w-80 mb-3'>Chosen Products / Images Here</div>
            </div>
            <Footer />
        </div>
    )
}
export default Checkout