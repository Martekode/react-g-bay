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
  async getAllNames() {
    const query = "SELECT name FROM user_table";
    return this.pool.query(query);
  }
  async getUserByID(id) {
    const query = "SELECT id,name,email,image_url FROM user_table WHERE ID = ?";
    return this.pool.query(query, id);
  }
  async getUserByEmail(email) {
    const query =
      "SELECT id,name,email,image_url FROM user_table WHERE email = ?";
    return this.pool.query(query, email);
  }
  async getUserByName(name) {
    const query =
      "SELECT id,name,email,image_url FROM user_table WHERE name = ?";
    return this.pool.query(query, name);
  }
  /*
 ___  _  __  ___ 
| o \/ \/ _||_ _|
|  _( o )_ \ | | 
|_|  \_/|__/ |_|              
Here we define all Post methods
*/
  async createNewUser(username, email, image_url) {
    if (image_url === undefined) {
      image_url = "";
    }
    const secret = "placeholderpw";
    const query =
      "INSERT INTO user_table (name,password,email,image_url) VALUES(?,?,?,?)";
    //Creating placeholder for password <> Auth done by Auth0 ?
    return this.pool.query(query, [username, secret, email, image_url]);
  }
  async createNewUserEmailOnly(email) {
    const name = this.createRandomName();
    const secret = this.createRandomPassword();
    const imageUrl = "";
    const query =
      "INSERT INTO user_table (name,password,email,image_url) VALUES(?,?,?,?)";
    return this.pool.query(query, [name, secret, email, imageUrl]);
  }
  /*
 _     ____  ____  ____  _____  _____
/ \ /\/  __\/  _ \/  _ \/__ __\/  __/
| | |||  \/|| | \|| / \|  / \  |  \  
| \_/||  __/| |_/|| |-||  | |  |  /_ 
\____/\_/   \____/\_/ \|  \_/  \____\
     
*/
  async updateUserName(id, newname) {
    const query = "UPDATE user_table SET name = ? WHERE id = ?";
    return this.pool.query(query, [newname, id]);
  }
  //HELPERS
  createRandomName() {
    let result = "";
    const nameLength = 8;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < nameLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  createRandomPassword() {
    let result = "";
    const nameLength = 8;
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789-";
    for (let i = 0; i < nameLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

const user = new User();
module.exports = user;
