import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {
    let totalPrice = 0
    const priceArray = []
    const productArray = [
        {name: 'funko-pop', price: 2, amount: 1},
        {name: 'action figure', price: 4, amount: 1},
        {name: 'tcg-Cards', price: 15, amount: 1},
        {name: 't-shirt', price: 11, amount: 1},
    ]

    const handleAmount =(e)=>{
        e.preventDefault()
        console.log(e.target.value)
        const result = e.target.value
        console.log(priceArray);
        return result
    }


    return (
        <div>
            <Navbar/>
            <div className='flex flex-col items-center'>
                <ul>
                    {productArray.map((product,i) => {
                        priceArray.push((product.price*product.amount))
                        return (
                                    <li key={i} className='border-2 w-[45rem] h-28 m-1'>name: {product.name} <br/>
                                        price: {product.price}<br/>
                                        <input type='number' min='0' defaultValue={product.amount} className='w-12 h-8' onChange={handleAmount}/>
                                    </li>

                        );
                    })}
                </ul>
                <p>Total price : {totalPrice}</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Checkout