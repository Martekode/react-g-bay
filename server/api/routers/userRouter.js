const express = require("express");
const router = express.Router();
const errorHandler = require("../helpers/errorHandler");
const user = require("../models/user");
const encryptor = require("../helpers/encryption");
//BASE PATH - DEV INDICATOR
router.get("/", (request, response) => {
  const test = encryptor.encrypt("Hello", "Secret");
  response.json(test);
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
/*
 ___  _  __  ___ 
| o \/ \/ _||_ _|
|  _( o )_ \ | | 
|_|  \_/|__/ |_|              
Here we define all Post methods
*/

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
