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
  /*
 ___  _  __  ___ 
| o \/ \/ _||_ _|
|  _( o )_ \ | | 
|_|  \_/|__/ |_|              
Here we define all Post methods
*/
}
const user = new User();
module.exports = user;