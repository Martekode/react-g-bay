//We Need express since it's an express application
const express = require("express");
//Since this is a part of our app we create a router
const router = express.Router();
//Get model
const product = require("../models/Product");
//Get Helpers
const errorHandler = require("../helpers/errorHandler");
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
    const handledError = errorHandler(error);
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
    const { ownerId, name, price, description, imageUrl, category } =
        request.body;
    if (!(ownerId && name && price && description && imageUrl && category)) {
      throw new Error("undefined");
    }
    const result = await product.addNewProduct(
        ownerId,
        name,
        price,
        description,
        imageUrl,
        category
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
/*
 .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
| | _____  _____ | || |   ______     | || |  ________    | || |      __      | || |  _________   | || |  _________   | |
| ||_   _||_   _|| || |  |_   __ \   | || | |_   ___ `.  | || |     /  \     | || | |  _   _  |  | || | |_   ___  |  | |
| |  | |    | |  | || |    | |__) |  | || |   | |   `. \ | || |    / /\ \    | || | |_/ | | \_|  | || |   | |_  \_|  | |
| |  | '    ' |  | || |    |  ___/   | || |   | |    | | | || |   / ____ \   | || |     | |      | || |   |  _|  _   | |
| |   \ `--' /   | || |   _| |_      | || |  _| |___.' / | || | _/ /    \ \_ | || |    _| |_     | || |  _| |___/ |  | |
| |    `.__.'    | || |  |_____|     | || | |________.'  | || ||____|  |____|| || |   |_____|    | || | |_________|  | |
| |              | || |              | || |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'
 */
router.update("/update/:product")
module.exports = router;

//!!!ADD MODEL TO HANDLE ERROR -> Takes error code -> Returns error message :: Does not interfer with HTTP
//GET PRODUCT BY CATEGORY
// router.get("/category/:category", async (request, response) => {
//   try {
//     if (!isNaN(request.params.category)) {
//       throw new Error("Bad Input");
//     }
//     const query = "SELECT * FROM product_table WHERE category = ?";
//     const result = await pool.query(query, [request.params.category]);
//     response.status(200).json(result);
//   } catch (error) {
//     switch (error.message) {
//       case "Bad Input":
//         response
//           .status(400)
//           .json('Query must be of type: String -"Miss me yet ? x TypeScript"');
//         break;
//       default:
//         response.status(500).send(error);
//         break;
//     }
//   }
// });