import React from "react";
import {GrAdd} from "react-icons/gr";

function Test (props){
    return (
        <div className="flex justify-center">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-hovers shadow-lg scale-75 bg-product">
                <img
                    className="w-80 h-80 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src="https://images.unsplash.com/photo-1561409106-fece1abb71cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt=""/>
                <div className="p-12 flex flex-col items-center">
                    <h5 className="text-gray-900 text-3xl font-medium mb-2">{props.productName}</h5>
                    <p className="text-gray-700 text-xl mb-4">
                        {props.Description}
                    </p>
                    <p className="text-gray-600 text-2xl mt-10">{props.productPrice}</p>
                    <button className="border-2 border-solid mt-6 hover:bg-hovers p-2 w-10 h-10 flex justify-center items-center rounded-full" ><GrAdd /></button>
                </div>
            </div>
        </div>
    );
}

export default Test;