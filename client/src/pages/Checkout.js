import React, {useState} from "react";


function Checkout() {
    const [totalPrice, setTotalPrice] = useState(0)
    const priceArray = []
    const productArray = [
        {name: 'funko-pop', price: 2},
        {name: 'action figure', price: 4},
        {name: 'tcg-Cards', price: 15},
        {name: 't-shirt', price: 11},
    ]


    return (
        <div>
            <p className='flex justify-center items-center text-6xl mt-24 font-bangers'>Checkout</p>
            <div className='flex flex-col items-center mt-12'>
                <ul>
                    {productArray.map((product, i) => {
                        priceArray.push(product.price)
                        return (
                            <li key={i} className='border-2 w-[45rem] h-28 m-1'>name: {product.name} <br/>
                                price: {product.price}<br/>
                            </li>

                        );
                    })}
                </ul>
                <p className='mt-12 mb-12 text-3xl font-bangers'>Total price : {totalPrice ? totalPrice : setTotalPrice(priceArray.reduce((a, v) => a + v, 0)) }</p>
            </div>
        </div>
    )
}

export default Checkout