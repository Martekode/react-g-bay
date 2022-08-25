import React from "react";
import {useState} from "react";
import axios from "axios";

function NewProduct () {
    const url = "http://localhost:3050/api/product/new"
    const [data, setData] = useState({
        owner_id: "",
        name: "",
        price: "",
        description: "",
        image_url: "",
        category: ""
    })

    function submit (e) {
        e.preventDefault();
        axios.post(url, {
            owner_id: data.owner_id,
            name: data.name,
            price: data.price,
            description: data.description,
            image_url: data.image_url,
            category: data.category
        }).then(res => {
            console.log(res.data)
        })
    }

    function handle (e) {
        const newestData = {...data}
        newestData[e.target.id] = e.target.value
        setData(newestData)
    }
    return (
        <div>
            <h1 className='text-6xl text-center font-bangers mt-12'>Sell Your Products Here</h1>
            <form className='grid grid-cols-2 justify-between justify-items-center m-5 text-center mt-12' onSubmit={(e) => submit(e)}>
                <input className='border-2  h-24 w-52 m-2' type="text" onChange={(e) => handle(e)} id="owner_id" placeholder="owner_id" value={data.owner_id}></input>
                <input className='border-2  h-24 w-52 m-2' type="text" onChange={(e) => handle(e)} id="name" placeholder="name of your product" value={data.name}></input>
                <input className='border-2  h-24 w-52 m-2' type="text" onChange={(e) => handle(e)} id="description" placeholder="description" value={data.description}></input>
                <input className='border-2  h-24 w-52 m-2' type="text" onChange={(e) => handle(e)} id="price" placeholder="price" value={data.price}></input>
                <input className='border-2  h-24 w-52 m-2' type="text" onChange={(e) => handle(e)} id="image_url" placeholder="image_url" value={data.image_url}></input>
                <input className='border-2  h-24 w-52 m-2' type="text" onChange={(e) => handle(e)} id="category" placeholder="category" value={data.category}></input>
                <div className='flex justify-center items-center'>
                    <button className='border w-24 bg-product mb-12'>Submit</button>
                </div>
                </form>

        </div>
    )
}
export default NewProduct;