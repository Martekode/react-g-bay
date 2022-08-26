import React, {useState, useEffect} from "react";
import {GrAdd} from "react-icons/gr";
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {checkoutArrayState} from "../App";



function Card () {

    const setCheckoutArray = useSetRecoilState(checkoutArrayState);
    const CheckoutArrayValue = useRecoilValue(checkoutArrayState);

    const addItem = (e) => {
        setCheckoutArray((checkoutArrayState) => [...checkoutArrayState,
            e.target.value ])
        console.log(CheckoutArrayValue);
    }

    const [products, setProducts] = useState ([]);
    const [test, setTest] = useState([]);


    useEffect(() => {
        async function getCategoryData() {
                const response = await fetch("http://localhost:3050/api/product/category/cards")
                const data = await response.json();
                console.log(data)
                setProducts(data);
                console.log(setProducts);

        }
        getCategoryData();
    },[])

    // function addItem (e) {
    //     setArray(e.target.value)
    // }



    return (
        <div className="grid grid-cols-3">
            {products.map((product, index) => (
                        <div className="border flex flex-col md:flex-row md:max-w-xl rounded-lg bg-backgroundTwo shadow-lg scale-75" key={index}>
                            <img
                                className="w-80 h-80 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                                src={product.image_url} alt=""/>
                            <div className="p-12 flex flex-col items-center">
                                <h5 className="text-gray-900 text-3xl font-medium mb-2">{product.name}</h5>
                                <p className="text-gray-700 text-xl mb-4">
                                    Price: {product.price}€
                                </p>
                                <p className="text-gray-600 text-2xl mt-10">{product.description}</p>
                                <button key={index} value={product.id} onClick={addItem} className="border-2 border-solid mt-6 hover:bg-hovers p-2 w-20 h-10 flex justify-center items-center rounded-full" ><GrAdd /></button>
                            </div>
                        </div>
            ))}
        </div>
    );
}
export default Card