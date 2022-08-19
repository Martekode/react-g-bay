import express from 'express'

const productRouter = express.Router()

import Product from "../models/productModel.js"

productRouter.get('api/products', (_request, response) => {
    const product = new Product (
        `SELECT ID FROM product_table`,
        `SELECT name FROM product_table`,
        `SELECT price FROM product_table`
    )
    response.send('id:' + product.getId())
    response.send('name:' + product.getName())
    response.send('price:' + product.getPrice())
})
//Make this router accessible to JavaScript Modules
export default productRouter();