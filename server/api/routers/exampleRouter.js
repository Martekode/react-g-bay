import express from 'express';

//Define this router
const uploadRouter = express.Router()

//Get the model used
import Example from '../models/exampleModel.js'

//Add example get method
uploadRouter.get('/', (_request, response) => {
    const example = new Example('I am an example object')
    response.send('Example object says:' + example.getName())
})


//Make this router accessible to JavaScript Modules
export default uploadRouter;