const mysql = require("mysql");
const { Pool } = require('pg');


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'mint',
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to database:", err);
//     process.exit(1);
//   }
//   console.log("Connected to database");
// });



// module.exports = db;


const db1 = new Pool({
  host: "aws-0-eu-central-1.pooler.supabase.com", 
  user: "postgres.gdfbbwwoargbwviquznn",
  password: "ntwali123@DIOUF",
  database: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
})

db1.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to the database. Current time:', res.rows[0].now);
  }
  // db1.end();
});

module.exports = db1