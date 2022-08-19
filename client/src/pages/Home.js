import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home =() => {
    return (
        <div>
            <Navbar />
            <div className='border border-solid border-l-black w-100% h h-screen'>
                <h2 className='justify-center items-center'></h2>
                <div className='grid grid-cols-4 h justify-items-center items-center mt-24'>

                    <p className='border-2  h-48 w-52 mb-3'>1st Category</p>
                    <p className='border-2  h-48 w-52 mb-4'>2nd Category</p>
                    <p className='border-2  h-48 w-52 mb-4'>3th Category</p>
                    <p className='border-2  h-48 w-52 mb-4'>4th Category</p>
                    <p className='border-2  h-48 w-52 mb-4' >5th Category</p>
                    <p className='border-2  h-48 w-52 mb-4'>6th Category</p>
                    <p className='border-2  h-48 w-52 mb-4'>7th Category</p>
                    <p className='border-2  h-48 w-52 mb-4'>8th Category</p>

                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home