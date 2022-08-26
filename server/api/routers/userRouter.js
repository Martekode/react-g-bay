const express = require("express");
const router = express.Router();
const errorHandler = require("../helpers/errorHandler");
const validator = require("../helpers/validator");
const user = require("../models/user");
//BASE PATH - DEV INDICATOR
router.get("/", (_request, response) => {
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
    const result = await user.getUserByID(request.params.id).catch((err) => {
      throw new Error("server", { cause: err });
    });
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
    const result = await user
      .getUserByEmail(request.params.email)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!result.length) {
      throw new Error("EmailNotFound");
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
router.get("/name/all", async (_request, response) => {
  try {
    const result = await user.getAllNames().catch((err) => {
      throw new Error("server", { cause: err });
    });
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//SEE IF USERNAME EXISTS - RETURNS TRUE/FALSE DEPENDING IF USERNAME EXISTS
router.get("/name/check/:name", async (request, response) => {
  try {
    const result = await user
      .getUserByName(request.params.name)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
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
//AUTH ZERO RETURNS EMAIL  - SERVES AS ID
//CHECK IF EMAIL EXISTS IN DATABASE
//IF FALSE SEND MAIL TO CREATE USER ENDPOINT
//IF TRUE SAVE

//SEE IF EMAIL EXISTS - RETURNS TRUE/FALSE DEPENDING IF EMAIL EXISTS
router.get("/email/check/:email", async (request, response) => {
  try {
    const { email } = request.body.email;
    if (!email) {
      throw new Error("undefined");
    }
    const result = await user.getUserByEmail(email).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (!result.length) {
      throw new Error("EmailNotFound");
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
router.post("/new", async (request, response) => {
  try {
    const { username, email, image_url } = request.body;
    if (!(username && email)) {
      throw new Error("undefined");
    }
    if (!validator.validateEmail(email)) {
      throw new Error("BadEmail");
    }
    const imgUrlIsValid = await validator
      .validateImageUrl(image_url)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    let validImageUrl = "";
    if (!imgUrlIsValid) {
      validImageUrl = validator.getDefaultImage();
    } else {
      validImageUrl = image_url;
    }
    const emailCheck = await user.getUserByEmail(email).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (emailCheck.length) {
      throw new Error("mailAlreadyInDB");
    }
    const result = await user.createNewUser(username, email, validImageUrl);
    response.status(200).json({
      "AddedUserId:": result.insertId.toString(),
    });
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
router.post("/newbyemail", async (request, response) => {
  try {
    const { email, image_url } = request.body;
    if (!email) {
      throw new Error("undefined");
    }
    const emailCheck = await user.getUserByEmail(email).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (emailCheck.length) {
      throw new Error("mailAlreadyInDB");
    }
    const imgUrlIsValid = await validator
      .validateImageUrl(image_url)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    let validImageUrl = "";
    if (!imgUrlIsValid) {
      validImageUrl = validator.getDefaultImage();
    } else {
      validImageUrl = image_url;
    }
    const result = await user
      .createNewUserEmailOnly(email, validImageUrl)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    response.status(200).json({
      AddedUserId: result.insertId.toString(),
    });
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//POST METHOD TO SEE IF EMAIL EXISTS
router.post("/check/email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      throw new Error("undefined");
    }
    const result = await user.getUserByEmail(email).catch((err) => {
      throw new Error("server", { cause: err });
    });
    console.log(result.length);
    if (!result.length) {
      res.status(200).send(false);
      return;
    }
    if (result.length > 1) {
      throw new Error("TooManyUsers");
    }
    res.status(200).send(true);
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    res.status(handledError.status).json(handledError.message);
  }
});
/*
 _     ____  ____  ____  _____  _____
/ \ /\/  __\/  _ \/  _ \/__ __\/  __/
| | |||  \/|| | \|| / \|  / \  |  \  
| \_/||  __/| |_/|| |-||  | |  |  /_ 
\____/\_/   \____/\_/ \|  \_/  \____\
                                     
*/
//UPDATE BY ID
router.put("/update/byid/name", async (request, response) => {
  try {
    const { userid, newname } = request.body;
    if (!(userid && newname)) {
      throw new Error("undefined");
    }
    const checkValidID = await user.getUserByID(userid).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (!checkValidID.length) {
      throw new Error("BadId");
    }
    const result = await user.updateUserName(userid, newname).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (!result.affectedRows) {
      throw new Error("UpdateError");
    }
    const updatedUser = await user.getUserByID(userid).catch((err) => {
      throw new Error("server", { cause: err });
    });
    response.status(200).json(updatedUser[0]);
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//UPDATE USERNAME TROUGH EMAIL
router.put("/update/bymail/name", async (request, response) => {
  try {
    const { email, newname } = request.body;
    if (!(email && newname)) {
      throw new Error("undefined");
    }
    const checkValidEmail = await user.getUserByEmail(email).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (!checkValidEmail.length) {
      throw new Error("EmailNotFound");
    }
    const result = await user
      .updateUserByMailName(email, newname)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!result.affectedRows) {
      throw new Error("UpdateError");
    }
    const updatedUser = await user.getUserByEmail(email).catch((err) => {
      throw new Error("server", { cause: err });
    });
    response.status(200).json(updatedUser[0]);
  } catch (error) {
    const handledError = errorHandler.handleUserError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//UPDATE USER IMAGE URL TROUGH USER ID
router.put("/update/byid/image", async (req, res) => {
  try {
    const { userid, image_url } = req.body;
    if (!(userid && image_url)) {
      throw new Error("undefined");
    }
    const isImageValid = await validator.validateImageUrl(image_url);
    if (!isImageValid) {
      throw new Error("BadImage");
    }
    const result = await user.updateImage(userid, image_url);
    if (!result.affectedRows) {
      throw new Error("BadEmail");
    }
    const updatedUser = await user.getUserByID(userid);
    res.status(200).json(updatedUser[0]);
  } catch (err) {
    const ve = errorHandler.handleUserError(err);
    res.status(ve.status).json(ve.message);
  }
});
//UPDATE USER IMAGE URL TROUGH USER EMAIL
router.put("/update/bymail/image", async (req, res) => {
  try {
    const { email, image_url } = req.body;
    if (!email && image_url) {
      throw new Error("undefined");
    }
    const isImageValid = await validator
      .validateImageUrl(image_url)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!isImageValid) {
      throw new Error("BadImage");
    }
    const result = await user
      .updateImageByMail(email, image_url)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!result.affectedRows) {
      throw new Error("BadEmail");
    }
    const updatedUser = await user.getUserByEmail(email).catch((err) => {
      throw new Error("server", { cause: err });
    });
    res.status(200).json(updatedUser[0]);
  } catch (err) {
    const handledError = errorHandler.handleUserError(err);
    res.status(handledError.status).json(handledError.message);
  }
});
module.exports = router;
