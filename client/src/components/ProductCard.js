import React, {useState, useEffect} from "react";
import {GrAdd} from "react-icons/gr";

function ProductCard () {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        async function getProductData() {
              const response = await fetch("http://localhost:3050/api/product/id/5")
                const data = await response.json();
                console.log(data);
                setName(data.name)
                setPrice(data.price)
                setDescription(data.description)
                setImage(data.image)

        }
        getProductData();
    },[])

   // let res = await axios.get('http://localhost:3050/api/product/id/5');
   // let data = res.data;
   // console.log(data)
        // .then(res => {
        //     const testing = res.data;
        //     console.log(res.data)
// )}

    return (
        <div className="flex justify-center">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-hovers shadow-lg scale-75">
                <img
                    className="w-80 h-80 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src={image} alt=""/>
                <div className="p-12 flex flex-col items-center">
                    <h5 className="text-gray-900 text-3xl font-medium mb-2">{name}</h5>
                    <p className="text-gray-700 text-xl mb-4">
                        {price}
                    </p>
                    <p className="text-gray-600 text-2xl mt-10">{description}</p>
                    <button className="border-2 border-solid mt-6 hover:bg-hovers p-2 w-10 h-10 flex justify-center items-center rounded-full" ><GrAdd /></button>
                </div>
            </div>
        </div>

    )
}

export default ProductCard