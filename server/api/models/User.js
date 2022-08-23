const pool = require("../helpers/database");
class User {
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
  async getUserByID(id) {
    const query = "SELECT name,email,image_url FROM user_table WHERE ID = ?";
    return this.pool.query(query, id);
  }
  async getUserByEmail(email) {
    const query = "SELECT * FROM user_table WHERE email = ?";
    return this.pool.query(query, email);
  }
  /*
 ___  _  __  ___ 
| o \/ \/ _||_ _|
|  _( o )_ \ | | 
|_|  \_/|__/ |_|              
Here we define all Post methods
*/
  async createNewUser(username, email, image_url) {
    const query =
      "INSERT INTO user_table(username,password,email,image_url)VALUES(?,?,?)";

    //Creating placeholder for password <> Auth done by Auth0 ?
    return this.pool.query(query, username, secret);
  }
  encryptSecret(string, email) {}
  decryptSecret(string, email) {}
}

/* 

Email as ID

*/
const user = new User();
module.exports = user;
