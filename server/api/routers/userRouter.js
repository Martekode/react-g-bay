const express = require("express");
const router = express.Router();
const pool = require("../helpers/database");
//BASE PATH - DEV INDICATOR
router.get("/", (request, response) => {
  response.send("USER ROUTE REACHED");
});

module.exports = router;

/*
//ADD NEW USER
router.post("/add", async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const newUserQuery =
      "INSERT INTO user_table (username,password,email) VALUES (?,?,?)";
    const result = await pool.query(newUserQuery, [username, password, email]);
    console.log(result);
    response.status(200).json({ userID: result.insertId.toString() });
  } catch (error) {
    console.log("ADD USER CATCHBLOCK TRIGGERED");
    response.status(400).send(error.message);
  }
});
// GET USER BY ID
router.get("/id/:id", async (request, response) => {
  try {
    const query = "SELECT id,username,email FROM user_table WHERE id=?";
    const rows = await pool.query(query, request.params.id);
    if (rows.length > 0) {
      response.status(200).json(rows);
    } else {
      response.status(400).send(`No user found with ID: ${request.params.id}`);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
});
*/
