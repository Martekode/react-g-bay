import React, {useState} from "react";


function Checkout() {
    const [totalPrice, setTotalPrice] = useState(0)
    const priceArray = []
    const productArray = [
        {name: 'funko-pop', price: 2, amount: 1},
        {name: 'action figure', price: 4, amount: 1},
        {name: 'tcg-Cards', price: 15, amount: 1},
        {name: 't-shirt', price: 11, amount: 1},
    ]

    const handleAmount = (e) => {
        e.preventDefault()
        console.log(productArray);
        console.log(e.target.value);
        productArray[e.target.id].amount = Number(e.target.value)
        console.log(productArray);
        handlePrice()
    }

    const handlePrice = () => {
        productArray.map((product, i) => {
            priceArray[i] = (product.price * product.amount)
            console.log(priceArray);
        })
        setTotalPrice(priceArray.reduce((a, v) => a + v, 0))
        console.log(totalPrice);
    }

    return (
        <div>
            <p className='flex justify-center items-center text-6xl mt-24 font-bangers'>Checkout</p>
            <div className='flex flex-col items-center mt-12'>
                <ul>
                    {productArray.map((product, i) => {
                        priceArray.push(product.amount * product.price)
                        return (
                            <li key={i} className='border-2 w-[45rem] h-28 m-1'>name: {product.name} <br/>
                                price: {product.price}<br/>
                                <input type='number' min='0' id={i} defaultValue={product.amount} className='w-12 h-8 bg-background'
                                       onChange={handleAmount}/>
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