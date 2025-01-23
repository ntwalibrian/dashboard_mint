const db = require("../db/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

exports.validateUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required fr bck" });
  }
  const query = "SELECT * FROM users WHERE username = $1";
  db.query(query, [username], (err, result) => {
    if (err) {
      return res.json({ error: "Internal server error" + err });
    }
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const user = result.rows[0];

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({
      success: "Login successful",
      user: { id: user.id, username: user.username },
      token: token,
    });
  });
};
