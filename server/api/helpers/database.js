const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  ssl: {
    rejectUnauthorized: false
  },
});

//Check for errors
pool.getConnection((error, connection) => {
  if (error) {
    switch (error.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("DB CONNECTION LOST!");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("DB RECEIVED TOO MANY CONNECTIONS");
        break;
      case "ECONNREFUSED":
        console.error("DB HAS REFUSED CONNECTION");
        break;
    }
  }
  if (connection) {
    connection.release();
  }
});
module.exports = pool;
