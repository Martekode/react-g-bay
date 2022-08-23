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
    async deleteProductById(id) {
        const query = "DELETE FROM product_table WHERE id = ?";
        return this.pool.query(query, [id]);
    }

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
    async updateProduct(name, price, description, imageUrl, category) {
        const query = "UPDATE product_table SET name = '?',price = '?',description = '?',image_url = '?',category = '?' WHERE product_id = '?'"
        return this.pool.query(query, [
            name,
            price,
            description,
            imageUrl,
            category
        ]);
    }
    async updateProductName(name){
        const query = "UPDATE product_table SET name = '?' WHERE ID = ID"
    }
}

const product = new Product();

module.exports = product;
