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
    const result = await product.getAllProducts().catch((err) => {
      throw new Error("server", { cause: err });
    });
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
    const result = await product
      .getProductById(request.params.id)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!result.length) {
      throw new Error("NoResult");
    }
    response.status(200).json(result[0]);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//GET PRODUCT BY CATEGORY
router.get("/category/:category", async (request, response) => {
  try {
    if (!request.params.category) {
      throw new Error("undefined");
    }
    const isCategoryValid = validator.validateCategory(request.params.category);
    if (!isCategoryValid) {
      throw new Error("BadCategory");
    }
    const result = await product
      .getProductsByCategory(request.params.category)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!result.length) {
      throw new Error("NoResult");
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
    const result = await product.getAllCategories().catch((err) => {
      throw new Error("server", { cause: err });
    });
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
// get all products by owner id
router.get("/owner/id/:id", async (request, response) => {
  try {
    const userid = request.params.id;
    const checkValidID = await user.getUserByID(userid);
    if (!checkValidID.length) {
      throw new Error("BadId");
    }
    const result = await product.getAllProductsByOwnerId(userid);
    response.status(200).json(result);
  } catch (error) {
    const handleError = errorHandler.handleProductError(error);
    response.status(handleError.status).json(handleError.message);
  }
});
// get all products by user email
router.get("/all/owner/email/:email", async (request, response) => {
  try {
    const result = await product.getAllProductsByEmail(request.params.email);
    response.status(200).json(result);
  } catch (error) {
    const handleError = errorHandler.handleProductError(error);
    response.status(handleError.status).json(handleError.message);
  }
});
/*
api/product/categories
api/product/owner/id/5
api/product/owner/email/:email

site.com/api/product/products/owner/4948

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
    const result = await product
      .addNewProduct(
        owner_id,
        name,
        price,
        description,
        validImageUrl,
        validatedCategory
      )
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    const RawInsertedProductID = result.insertId.toString();
    response.status(200).json({
      AddedProductId: RawInsertedProductID,
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
    const result = await product
      .addNewProductByOwnerEmail(
        email,
        name,
        price,
        description,
        validImageUrl,
        category
      )
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    response.status(200).json({ AddedProductId: result.insertId.toString() });
  } catch (err) {
    const e = errorHandler.handleProductError(err);
    response.status(e.status).json(e.message);
  }
});
//GET INFO BY POST
router.post("/all/owner/email", async (request, response) => {
  try {
    const email = request.body.email;
    if (!email) {
      throw new Error("undefined");
    }
    const result = await product
      .getAllProductsByOwnerEmail(email)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    response.status(200).json(result);
  } catch (error) {
    const handledError = errorHandler.handleProductError(error);
    response.status(handledError.status).json(handledError.message);
  }
});
//UPDATE PRODUCT IMAGE BY ID
router.post("/update/byid/image", async (req, res) => {
  try {
    const { productid, image_url } = req.body;
    if (!(productid, image_url)) {
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
    const result = await product
      .updateImage(productid, image_url)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    const updatedProduct = await product
      .getProductById(productid)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!result.affectedRows) {
      throw new Error("BadId");
    }
    res.status(200).json(updatedProduct[0]);
  } catch (err) {
    const handledError = errorHandler.handleProductError(err);
    res.status(handledError.status).json(handledError.message);
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
  try {
    if (isNaN(request.params.id)) {
      throw new Error("NaN");
    }
    const result = await product
      .deleteProductById(request.params.id)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!result.affectedRows) {
      throw new Error("BadId");
    }
    response.status(200).json({
      "ProductDeletionSuccess:": true,
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
    const sellerFetch = await user.getUserByID(seller_Id).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (!sellerFetch.length) {
      throw new Error("BadId");
    }
    const seller = sellerFetch[0];
    const buyerFetch = await user.getUserByID(buyer_Id).catch((err) => {
      throw new Error("server", { cause: err });
    });
    if (!buyerFetch.length) {
      throw new Error("BadId");
    }
    const buyer = buyerFetch[0];
    const productFetch = await product
      .getProductById(product_Id)
      .catch((err) => {
        throw new Error("server", { cause: err });
      });
    if (!productFetch.length) {
      throw new Error("BadId");
    }
    const tradedProduct = productFetch[0];
    const mailToBuyer = await sendBoughtMail(
      buyer,
      seller,
      tradedProduct
    ).catch((err) => {
      throw new Error("server", { cause: err });
    });
    const mailToSeller = await sendSoldMail(buyer, seller, tradedProduct).catch(
      (err) => {
        throw new Error("server", { cause: err });
      }
    );
    await product.deleteProductById(tradedProduct.id).catch((err) => {
      throw new Error("server", { cause: err });
    });
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

router.put("/update/name/:name", async (request, response) => {
  try {
    const { productID, newName } = request.body;
    if (!(productID && newName)) {
      throw new Error("undefined");
    }
    const checkValidId = await product.getProductById(productID);
    if (!checkValidId.length) {
      throw new Error("badId");
    }
    const checkForName = await product.getProductsByName(newName);
    if (checkForName.length) {
      throw new Error("");
    }
    await product.updateProductName(productID, newName);
    const updateProduct = await product.getProductById(productID);
    response.status(200).json(updateProduct[0]);
  } catch (error) {
    const handleError = errorHandler.handleProductError(error);
    response.status(handleError.status).json(handleError.message);
  }
});

module.exports = router;
