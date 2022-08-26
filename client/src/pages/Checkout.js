import React, {useState} from "react";
import {useRecoilValue} from "recoil";
import {checkoutArrayState} from "../App";
import axios from "axios";

function Checkout() {
    const [totalPrice, setTotalPrice] = useState(0)
    const priceArray = [];
    const CheckoutArrayValue = useRecoilValue(checkoutArrayState);


    CheckoutArrayValue.forEach((value) => {
        console.table(value);
        console.time(value);
    })

    const buySingleItem = (e) => {
        const product = JSON.parse(e.target.value);
        console.log('Chosen product: ');
        console.table(product)
        const productId = product.id;
        const ownerID = product.owner_id;
        console.log('product Information: ');
        console.log(productId);
        console.log(ownerID);
    }




    return (
        <div>
            <p className='flex justify-center items-center text-6xl mt-24 font-bangers'>Checkout</p>
            <div className='flex flex-col items-center mt-12 font-bangers text-xl'>
                <ul>
                    {CheckoutArrayValue.map((product, i) => {
                        priceArray.push(parseInt(product.price))
                        return (
                            <li key={i} className='border-2 w-[45rem] h-28 m-1'>name: {product.name} <br/>
                                price: {product.price}<br/>
                                <button value={JSON.stringify(product)} onClick={buySingleItem} className="border-2 border-solid mt-6 hover:bg-hovers p-2 w-20 h-10 flex justify-center items-center rounded-full">Buy this item right
                                    now!
                                </button>
                            </li>

                        );
                    })}
                </ul>
                <p className='mt-12 mb-12 text-3xl font-bangers'>Total price
                    : {totalPrice ? totalPrice : setTotalPrice(priceArray.reduce((a, v) => a + v, 0))}</p>
            </div>
        </div>
    )
}

export default Checkout