//We Need express since it's an express application
const express = require("express");
//Since this is a part of our app we create a router
const router = express.Router();
//Get model
const product = require("../models/Product");
const user = require("../models/User");
//Get Helpers
const errorHandler = require("../helpers/errorHandler");
const validator = require("../helpers/validator");
const sendBoughtMail = require("../helpers/mailForBuyer");
const sendSoldMail = require("../helpers/mailForSeller");
//BASE PATH - DEV INDICATOR
//We use this to make sure our router works :D
router.get("/", (_request, response) => {
  response.send("Product Router Reached");
});
/*
  __  ___  ___ 
 / _|| __||_ _|
( |_n| _|  | | 
 \__/|___| |_|   
 Here we define all getters
*/
//GET ALL PRODUCTS
router.get("/all", async (_request, response) => {
  try {
    const result = await product.getAllProducts();
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//GET PRODUCT BY ID
router.get("/id/:id", async (request, response) => {
  try {
    if (isNaN(request.params.id)) {
      throw new Error("NaN");
    }
    const result = await product.getProductById(request.params.id);
    if (!result.length) {
      throw new Error("BadId");
    }
    response.status(200).json(result[0]);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//GET PRODUCT BY NAME
router.get("/name/:name", async (request, response) => {
  try {
    const result = await product.getProductsByName(request.params.name);
    if (!result.length) {
      throw new Error("No result");
    }
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//GET PRODUCT BY CATEGORY
router.get("/category/:category", async (request, response) => {
  try {
    const result = await product.getProductsByCategory(request.params.category);
    if (!result.length) {
      throw new Error("No result");
    }
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//GET ALL CATEGORIES
router.get("/categories", async (_request, response) => {
  try {
    const result = await product.getAllCategories();
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
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
    const { owner_id, name, price, description, image_url, category } =
      request.body;
    if (!(owner_id && name && price && description && image_url && category)) {
      throw new Error("undefined");
    }
    let validatedCategory = validator.validateCategory(category);
    if (!validatedCategory) {
      throw new Error("BadCategory");
    }
    const imgUrlIsValid = await validator.validateImageUrl(image_url);
    let validImageUrl = "";
    if (!imgUrlIsValid) {
      validImageUrl = validator.getDefaultImage();
    } else {
      validImageUrl = image_url;
    }
    const result = await product.addNewProduct(
      owner_id,
      name,
      price,
      description,
      validImageUrl,
      validatedCategory
    );
    const RawInsertedProductID = result.insertId.toString();
    const insertedProduct = await product.getProductById(RawInsertedProductID);
    response.status(200).json({
      AddedProductId: RawInsertedProductID,
      AddedProduct: insertedProduct[0],
    });
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
router.post("/newbyemail", async (request, response) => {
  try {
    const { email, name, price, description, image_url, category } =
      request.body;
    if (!(email && name && price && description && image_url && category)) {
      throw new Error("undefined");
    }
    const validCategory = validator.validateCategory(category);
    if (!validCategory) {
      throw new Error("BadCategory");
    }
    const imgUrlIsValid = await validator.validateImageUrl(image_url);
    let validImageUrl = "";
    if (!imgUrlIsValid) {
      validImageUrl = validator.getDefaultImage();
    } else {
      validImageUrl = image_url;
    }
    const result = await product.addNewProductByOwnerEmail(
      email,
      name,
      price,
      description,
      validImageUrl,
      category
    );
    response.status(200).json({ AddedProductId: result.insertId.toString() });
  } catch (err) {
    const e = errorHandler.handleProductError(err);
    response.status(e.status).json(e.message);
  }
});
//GET INFO BY POST
router.post("/all/owner/email", async (request, response) => {
  try {
    const ownerEmail = request.body.email;
    if (!ownerEmail) {
      throw new Error("undefined");
    }
    const result = await product.getAllProductsByOwnerEmail(ownerEmail);
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
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
router.delete("/delete/:id", async (request, response) => {
  //INSERT CODE HERE
  try {
    const productToDelete = await product.getProductById(request.params.id);
    if (isNaN(request.params.id)) {
      throw new Error("NaN");
    }
    if (!productToDelete) {
      throw new Error("BadId");
    }
    const result = await product.deleteProductById(request.params.id);
    if (!result.affectedRows) {
      throw new Error("BadId");
    }
    response.status(200).json({
      "Deleted product:": productToDelete[0],
    });
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});

//SALE
router.post("/sale", async (request, response) => {
  try {
    const { seller_Id, buyer_Id, product_Id } = request.body;
    if (!(seller_Id, buyer_Id, product_Id)) {
      throw new Error("undefined");
    }

    const sellerFetch = await user.getUserByID(seller_Id);
    if (!sellerFetch.length) {
      throw new Error("BadId");
    }
    const seller = sellerFetch[0];
    const buyerFetch = await user.getUserByID(buyer_Id);
    if (!buyerFetch.length) {
      throw new Error("BadId");
    }
    const buyer = buyerFetch[0];
    const productFetch = await product.getProductById(product_Id);
    if (!productFetch.length) {
      throw new Error("BadId");
    }
    const tradedProduct = productFetch[0];
    const mailToBuyer = await sendBoughtMail(
      buyer,
      seller,
      tradedProduct
    ).catch((err) => {
      console.log(`Error in mail to buyer: ${err.message}`);
      throw new Error("Mailer");
    });
    const mailToSeller = await sendSoldMail(buyer, seller, tradedProduct).catch(
      (err) => {
        console.log(`Error in mail to seller: ${err.message}`);
        throw new Error("Mailer");
      }
    );
    product.deleteProductById(tradedProduct.id);
    response.status(200).json({
      salecompleted: true,
      MailSentToBuyer: mailToBuyer,
      MailSentToSeller: mailToSeller,
      SoldProduct: tradedProduct,
    });
  } catch (err) {
    const handledError = errorHandler.handleProductError(err);
    response.status(handledError.status).json(handledError.message);
  }
});
module.exports = router;
