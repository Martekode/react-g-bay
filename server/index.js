const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
//ROUTER IMPORTS
const userRouter = require("./api/routers/userRouter");
const productRouter = require("./api/routers/productRouter");

//ROUTERS
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Any uncaught returns index.html
app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
//Make App listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});