const db = require("../db/db");

const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";
exports.addUser = (req, res) => {
  const sql =
    "INSERT INTO users (`name`,`username`,`password`,`pin`,`email`) VALUES(?,?,?,?,?)";
  const values = [
    req.body.name,
    req.body.username,
    req.body.password,
    req.body.pin,
    req.body.email,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ message: "error ocured now" + err });
    return res.json({ success: "succefully created" });
  });
};

exports.verifyUser = (req, res) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  const un = req.body.username;
  db.query(sql, [un], (err, result) => {
    if (err) return res.json({ message: "Error occurred: " + err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result[0];

    const isPasswordValid = req.body.password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "3h" }
    );
    return res.json({
      success: "Login successful",
      user: { id: user.id, username: user.username },
      token: token,
    });
  });
};
