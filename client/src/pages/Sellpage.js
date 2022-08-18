import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Sellpage =() =>{
    return(
        <div className='text-center '>
            <Navbar/>
            <p className='border-2  h-48 w-52 mb-3'>Upload image</p>
            <div className='grid grid-cols-2'>
                <p>Product name</p>
                <p>Product description</p>
                <p>Product category</p>
                <p>Product price</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Sellpage