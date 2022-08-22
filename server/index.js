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

//ROUTERS
app.use("/user", userRouter);

// Any uncaught returns index.html
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
