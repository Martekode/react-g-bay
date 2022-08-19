import express from "express";

const userRouter = express.Router()

import User from "../models/userModel.js"

userRouter.get('/api/user', (_request, response) => {
    const user = new User (
        `SELECT ID FROM user_table`,
        `SELECT USERNAME FROM user_table`,
        `SELECT PASSWORD FROM user_table`,
        `SELECT EMAIL FROM user_table`
    )
    response.send('id:' + user.getId())
    response.send('username:' + user.getUserName())
    response.send('password:' + user.getPassword())
    response.send('email:' + user.getEmail())
})
//Make this router accessible to JavaScript Modules
export default userRouter();