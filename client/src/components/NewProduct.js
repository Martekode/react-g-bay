import React from "react";
import {useState} from "react";
import axios from "axios";

function NewProduct () {
    const url = "http://localhost:3050/api/product/new"
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    })

    function submit (e) {
        e.preventDefault();
        axios.post(url, {
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image
        }).then(res => {
            console.log(res.data)
        })
    }

    function handle (e) {
        const newestData = {...data}
        newestData[e.target.id] = e.target.value
        setData(newestData)
        console.log(newestData);
    }
    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input type="text" onChange={(e) => handle(e)} id="name" placeholder="name" value={data.name}></input>
                <input type="text" onChange={(e) => handle(e)} id="description" placeholder="description" value={data.description}></input>
                <input type="text" onChange={(e) => handle(e)} id="price" placeholder="price" value={data.price}></input>
                <input type="text" onChange={(e) => handle(e)} id="image" placeholder="image" value={data.image}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default NewProduct;