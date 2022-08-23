const express = require("express");
const router = express.Router();
const errorHandler = require("../helpers/errorHandler");
const user = require("../models/user");
const encryptor = require("../helpers/encryption");
const { request, response } = require("express");
//BASE PATH - DEV INDICATOR
router.get("/", (request, response) => {
  response.send("Hello From /user");
});
/*
  __  ___  ___ 
 / _|| __||_ _|
( |_n| _|  | | 
 \__/|___| |_|   
 Here we define all getters
*/
router.get("/id/:id", async (request, response) => {
  try {
    if (isNaN(request.params.id)) {
      throw new Error("NaN");
    }
    const result = await user.getUserByID(request.params.id);
    if (!result.length) {
      throw new Error("BadId");
    }
    response.status(200).json(result[0]);
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//GET USER BY EMAIL
router.get("/email/:email", async (request, response) => {
  try {
    const result = await user.getUserByEmail(request.params.email);
    if (!result.length) {
      throw new Error("BadEmail");
    }
    if (result.length > 1) {
      throw new Error("TooManyUsers");
    }
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//GET ALL USERNAMES IN DB
router.get("/name/all", async (request, response) => {
  try {
    const result = await user.getAllNames();
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//SEE IF USERNAME EXISTS - RETURNS TRUE/FALSE DEPENDING IF USERNAME EXISTS
router.get("/name/check/:name", async (request, response) => {
  try {
    const result = await user.getUserByName(request.params.name);
    if (!result.length) {
      response.status(200).send(false);
    }
    if (result.length) {
      response.status(200).send(true);
    }
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//SEE IF EMAIL EXISTS - RETURNS TRUE/FALSE DEPENDING IF EMAIL EXISTS
router.get("/email/check/:email", async (request, response) => {
  try {
    const result = await user.getUserByEmail(request.params.email);
    if (!result.length) {
      response.status(200).send(false);
    }
    if (result.length) {
      response.status(200).send(true);
    }
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
/*
 ___  _  __  ___ 
| o \/ \/ _||_ _|
|  _( o )_ \ | | 
|_|  \_/|__/ |_|              
Here we define all Post methods
*/
router.post("/new", async (request, response) => {
  try {
    const { username, email, image_url } = request.body;
    let imageurl;
    if (!(username && email)) {
      throw new Error("undefined");
    }
    if (image_url) {
      imageurl = image_url;
    }
    //Check if username exists
    const nameCheck = await user.getUserByName(username);
    if (nameCheck.length) {
      throw new Error("nameAlreadyInDB");
    }
    const emailCheck = await user.getUserByEmail(email);
    if (emailCheck.length) {
      throw new Error("mailAlreadyInDB");
    }
    const result = await user.createNewUser(username, email, imageurl);
    const responseUser = await user.getUserByID(result.insertId.toString());
    response.status(200).json({
      "DbId:": result.insertId.toString(),
      "UserObject:": responseUser[0],
    });
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});

/*
 _(`-')    (`-')  _         (`-')  _(`-')      (`-')  _ 
( (OO ).-> ( OO).-/  <-.    ( OO).-/( OO).->   ( OO).-/ 
 \    .'_ (,------.,--. )  (,------./    '._  (,------. 
 '`'-..__) |  .---'|  (`-') |  .---'|'--...__) |  .---' 
 |  |  ' |(|  '--. |  |OO )(|  '--. `--.  .--'(|  '--.  
 |  |  / : |  .--'(|  '__ | |  .--'    |  |    |  .--'  
 |  '-'  / |  `---.|     |' |  `---.   |  |    |  `---. 
 `------'  `------'`-----'  `------'   `--'    `------'
 */
module.exports = router;
