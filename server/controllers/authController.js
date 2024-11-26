const db1 = require("../db/db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

exports.addUser = (req, res) => {
  // SQL query for inserting data
  const sql = `
    INSERT INTO users ("name", "username", "password", "pin", "email")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  // Values to insert
  const values = [
    req.body.name,
    req.body.username,
    req.body.password,
    req.body.pin,
    req.body.email,
  ];

  // Execute the query
  db1.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error occurred: " + err.message });
    }
    return res.status(201).json({
      success: "User successfully created",
      user: result.rows[0], // Return the inserted user
    });
  });
};

exports.verifyUser = (req,res) => {
  const sql = 'SELECT * FROM users WHERE username = $1'
  const username = req.body.username
  db1.query(sql,[username],(err,result) => {
    if (err) return res.json({ message: "Error occurred: " + err });
    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result.rows[0];

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
  })
}


// exports.addUser = (req, res) => {
//   const sql =
//     "INSERT INTO users (`name`,`username`,`password`,`pin`,`email`) VALUES(?,?,?,?,?)";
//   const values = [
//     req.body.name,
//     req.body.username,
//     req.body.password,
//     req.body.pin,
//     req.body.email,
//   ];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "error ocured now" + err });
//     return res.json({ success: "succefully created" });
//   });
// };

// exports.verifyUser = (req, res) => {
//   const sql = "SELECT * FROM users WHERE username = ?";
//   const un = req.body.username;
//   db.query(sql, [un], (err, result) => {
//     if (err) return res.json({ message: "Error occurred: " + err });
//     if (result.length === 0)
//       return res.status(404).json({ message: "User not found" });

//     const user = result[0];

//     const isPasswordValid = req.body.password === user.password;

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }
//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       SECRET_KEY,
//       { expiresIn: "3h" }
//     );
//     return res.json({
//       success: "Login successful",
//       user: { id: user.id, username: user.username },
//       token: token,
//     });
//   });
// };
