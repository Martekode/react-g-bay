//Import > Require
import dotenv from 'dotenv'
dotenv.config()

//Get everything form express, name it express
import express from "express";
/*
This URL.fileURLToPath function decodes the file URL to a path string
and ensures that the URL control characters (/, %) are correctly appended/adjusted
when converting the given file URL into a path.
*/
//URL is a NodeJS Module to get filenames from a path in a correct manner
import { fileURLToPath } from "url";
//Path is a magic solution from node to resolve path stuff
import path from "path";
//TODO::Why are we using __filename ? - And not path to get this name >?
//Get the name of this file??
const __filename = fileURLToPath(import.meta.url);
//IMPORT ROUTERS HERE
import exampleRouter from './api/routers/exampleRouter.js'
import productRouter from './api/routers/productRouter.js'
import userRouter from "./api/routers/userRouter.js";

//Use file name to resolve the path to this file ?
//The path.dirname() method returns the directory name of a path,
//similar to the Unix dirname command. Trailing directory separators are ignored
//TODO:: Why are we using __dirname ?
const __dirname = path.dirname(__filename);
//Create express app
const app = express();
//MAKE APP USE ROUTERS HERE
app.use('/api/example', exampleRouter)
app.use('/api/product', productRouter) // todo fix this + understand
app.use('/api/user', userRouter)


//TODO::How does this work ?
//any get request not handled above will return the index.html in ../client/build
app.get('/root', (_req, res) => {
    res.send(DB_CONF)
})
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
//Define server port - take PORT from .env or use fallback:5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`API server is listening on port:${PORT}`);