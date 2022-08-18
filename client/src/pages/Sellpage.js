import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Sellpage =() =>{
    return(
        <div>
            <Navbar/>
            <p className='border-2  h-48 w-52 mx-auto mt-5 text-center'>Upload image</p>
            <div className='grid grid-cols-2 justify-between justify-items-center m-5 text-center'>
                <p className='border-2  h-48 w-52 m-2'>Product name</p>
                <p className='border-2  h-48 w-52 m-2'>Product description</p>
                <p className='border-2  h-48 w-52 m-2'>Product category</p>
                <p className='border-2  h-48 w-52 m-2'>Product price</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Sellpage