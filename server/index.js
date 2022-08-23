const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
//Use static files from ../client/build
app.use(express.static(path.join(__dirname, "../client/build")));
//ROUTER IMPORTS
const userRouter = require("./api/routers/userRouter");
const productRouter = require("./api/routers/productRouter");

//ROUTERS
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Any uncaught returns index.html - Breaks build
// app.get("/*", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "./dist/build", "index.html"));
// });
//Make App listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
