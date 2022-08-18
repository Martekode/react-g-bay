import React from "react";

function Product (props){
    return (
    <h1>{props.productName}{props.productPrice}{props.productAmount}</h1>
    );
}

export default Product;