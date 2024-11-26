const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mint',
});





db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
  console.log("Connected to database");
});



module.exports = db;