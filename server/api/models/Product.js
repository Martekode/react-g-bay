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
    const query = "SELECT * FROM product_table WHERE name = ?";
    return this.pool.query(query, [name]);
  }
  async getProductsByCategory(category) {
    const query = "SELECT * FROM product_table WHERE category = ?";
    return this.pool.query(query, [category]);
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
}
const product = new Product();
module.exports = product;