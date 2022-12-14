const pool = require("../helpers/database");
class Product {
  constructor() {
    this.pool = pool;
  }
  /*
  __  ___  ___
 / _|| __||_ _|
( |_n| _|  | |
 \__/|___| |_|
 Here we define all getters
*/
  async getAllProducts() {
    const query = "SELECT * FROM product_table";
    return this.pool.query(query);
  }
  async getProductById(id) {
    const query = "SELECT * FROM product_table WHERE id = ?";
    return this.pool.query(query, [id]);
  }
  async getAllCategories() {
    const query = "SELECT UNIQUE category FROM product_table";
    return this.pool.query(query);
  }
  async getProductsByName(name) {
    const query = "SELECT * FROM product_table WHERE name LIKE ?";
    return this.pool.query(query, [name]);
  }
  async getProductsByCategory(category) {
    const query = "SELECT * FROM product_table WHERE category LIKE ?";
    return this.pool.query(query, [category]);
  }
  async getAllProductsByOwnerId(id) {
    const query = "SELECT * FROM product_table WHERE owner_id = ?";
    return this.pool.query(query, [id]);
  }
  async getAllProductsByOwnerEmail(email) {
    const query =
      "SELECT product_table.id,product_table.owner_id,product_table.name,product_table.price,product_table.description,product_table.image_url,product_table.category FROM product_table LEFT JOIN user_table on product_table.owner_id = user_table.id WHERE email LIKE ?;";
    return this.pool.query(query, [email]);
  }

  /*
 ___  _  __  ___
| o \/ \/ _||_ _|
|  _( o )_ \ | |
|_|  \_/|__/ |_|
Here we define all Post methods
*/
  async addNewProduct(ownerId, name, price, description, imageUrl, category) {
    const query =
        "INSERT INTO product_table (owner_id,name,price,description,image_url,category) VALUES(?,?,?,?,?,?)";
    return this.pool.query(query, [
      ownerId,
      name,
      price,
      description,
      imageUrl,
      category,
    ]);
  }
  async addNewProductByOwnerEmail(
    email,
    name,
    price,
    description,
    imageUrl,
    category
  ) {
    const query =
      "INSERT INTO product_table(owner_id,name,price,description,image_url,category) VALUES((SELECT id FROM user_table WHERE email = ? ),?,?,?,?,?)";
    return this.pool
      .query(query, [email, name, price, description, imageUrl, category])
      .catch((error) => {
        if (error.text === `Column 'owner_id' cannot be null`) {
          throw new Error("BadEmail");
        } else {
          throw new Error("server", { cause: error });
        }
      });
  }
  /*
<<<<<<< HEAD
 _(`-')    (`-')  _         (`-')  _(`-')      (`-')  _
( (OO ).-> ( OO).-/  <-.    ( OO).-/( OO).->   ( OO).-/
 \    .'_ (,------.,--. )  (,------./    '._  (,------.
 '`'-..__) |  .---'|  (`-') |  .---'|'--...__) |  .---'
 |  |  ' |(|  '--. |  |OO )(|  '--. `--.  .--'(|  '--.
 |  |  / : |  .--'(|  '__ | |  .--'    |  |    |  .--'
 |  '-'  / |  `---.|     |' |  `---.   |  |    |  `---.
=======
 _     ____  ____  ____  _____  _____
/ \ /\/  __\/  _ \/  _ \/__ __\/  __/
| | |||  \/|| | \|| / \|  / \  |  \  
| \_/||  __/| |_/|| |-||  | |  |  /_ 
\____/\_/   \____/\_/ \|  \_/  \____\
     
*/
  async updateImage(id, imageUrl) {
    const query = "UPDATE product_table SET image_url = ? WHERE id = ?";
    return this.pool.query(query, [imageUrl, id]);
  }

  /*
 _(`-')    (`-')  _         (`-')  _(`-')      (`-')  _ 
( (OO ).-> ( OO).-/  <-.    ( OO).-/( OO).->   ( OO).-/ 
 \    .'_ (,------.,--. )  (,------./    '._  (,------. 
 '`'-..__) |  .---'|  (`-') |  .---'|'--...__) |  .---' 
 |  |  ' |(|  '--. |  |OO )(|  '--. `--.  .--'(|  '--.  
 |  |  / : |  .--'(|  '__ | |  .--'    |  |    |  .--'  
 |  '-'  / |  `---.|     |' |  `---.   |  |    |  `---. 
>>>>>>> main
 `------'  `------'`-----'  `------'   `--'    `------'
 */
  async deleteProductById(id) {
    const query = "DELETE FROM product_table WHERE id = ?";
    return this.pool.query(query, [id]);
  }
  /*
_     ____  ____  ____  _____  _____
/ \ /\/  __\/  _ \/  _ \/__ __\/  __/
| | |||  \/|| | \|| / \|  / \  |  \
| \_/||  __/| |_/|| |-||  | |  |  /_
\____/\_/   \____/\_/ \|  \_/  \____\

*/
  async updateProductName(id, newName) {
    const query = "UPDATE product_table SET name = ? WHERE id = ?";
    return this.pool.query(query, [newName, id]);
  }
  async updateProductPrice(id, newPrice) {
    const query = "UPDATE product_table SET price = ? WHERE id = ?";
    return this.pool.query(query, [newPrice, id]);
  }
  async updateProductDescription(id, newDescription) {
    const query = "UPDATE product_table SET description = ? WHERE id = ?";
    return this.pool.query(query, [newDescription, id]);
  }
  async updateProductImageUrl(id, newImageUrl) {
    const query = "UPDATE product_table SET image_url = ? WHERE id = ?";
    return this.pool.query(query, [newImageUrl, id]);
  }
  async updateProductCategory(id, newCategory) {
    const query = "UPDATE product_table SET category = ? WHERE id = ?";
    return this.pool.query(query, [newCategory, id]);
  }
}
const product = new Product();
module.exports = product;