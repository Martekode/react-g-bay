import React from "react";

import axios from "axios";
import {GrAdd} from "react-icons/gr";

async function ProductCard (props) {
   let res = await axios.get('http://localhost:3050/api/product/id/5');
   let data = res.data;
   console.log(data)
        // .then(res => {
        //     const testing = res.data;
        //     console.log(res.data)
// )}


    return (
        <div></div>

    )
}

export default ProductCard