import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {checkoutArrayState} from "../App";
import axios from "axios";
import {GrAdd} from "react-icons/gr";

function Checkout() {
    const [totalPrice, setTotalPrice] = useState(0)
    const priceArray = [];
    const CheckoutArrayValue = useRecoilValue(checkoutArrayState);
    const urlForSingleSale = 'http://localhost:3050/api/product/sale'

    CheckoutArrayValue.forEach((value) => {
        console.table(value);
        console.time(value);
    })

    const buySingleItem = (e) => {
        const product = JSON.parse(e.target.value);
        console.log('Chosen product: ');
        console.table(product)
        const productID = product.id;
        const ownerID = product.owner_id;
        console.log('product Information: ');
        console.log(productID);
        console.log(ownerID);

        const saleInfo = {
            ownerID: ownerID, buyerID: 3, productID: productID
        }
        concludeSaleforSingleProduct(saleInfo)
    }

    function concludeSaleforSingleProduct(saleInfo) {
        axios.post(urlForSingleSale, {
            seller_Id: saleInfo.ownerID, buyer_Id: saleInfo.buyerID, product_Id: saleInfo.productID
        }).then(res => {
            console.log(res.data)
        })
    }


    return (
        <div>
            <p className='flex justify-center items-center text-6xl mt-16 font-bangers'>Checkout</p>
            <div className='flex flex-row mt-12 font-bangers text-xl'>
                {CheckoutArrayValue.map((product, i) => {
                    priceArray.push(parseInt(product.price))
                    return (
                        <div
                            className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-backgroundTwo shadow-lg scale-75 bg-product">
                            <img
                                className="w-80 h-80 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                                src={product.image_url} alt=""/>
                            <div className="p-12 flex flex-col items-center">
                                <h5 key={i} className="text-gray-900 text-3xl font-medium mb-2">{product.name}</h5>
                                <p className="text-gray-600 text-2xl mt-10">price: {product.price}€</p>
                                <button value={JSON.stringify(product)} onClick={buySingleItem}
                                        className="border-2 border-solid mt-6 hover:bg-hovers p-2 w-40 h-20 flex justify-center items-center rounded-full">Buy
                                    this item right
                                    now!
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <p className='flex justify-center items-center mb-12 text-3xl font-bangers'>Total price
                : {totalPrice ? totalPrice : setTotalPrice(priceArray.reduce((a, v) => a + v, 0))}€</p>
        </div>

    )
}

export default Checkout