const db1 = require("../db/db");

exports.addListing = (req, res) => {
  const sql = `INSERT INTO stocks ("symbol", "company_name","current_price","total_supply")
  VALUES ($1,$2,$3,$4)
  RETURNING *;
  `;
  const values = [
    req.body.symbol,
    req.body.name,
    req.body.price,
    req.body.amount,
  ];
  db1.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error adding listing:", err);
      return res.status(500).json({ error: "Failed to add listing" + err });
    }
    res.status(201).json({ success: "Successfully added listing" });
  });
};

exports.getListing = (req,res) => {
  const sql = 'SELECT * FROM stocks'
  db1.query(sql,(err,results) =>{
    if (err) return res.json({ message: "error ocured" + err });
    return res.json(results);
  })
}


// exports.getListing = (req, res) => {
//   const sql = "SELECT * FROM stock_listing";
//   db.query(sql, (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json(result);
//   });
// };




// exports.addListing = (req, res) => {
//   const sql =
//     "INSERT INTO stock_listing (`symbol`, `name`, `price`, `in_stock_amount`) VALUES(?,?,?,?)";
//   const values = [
//     req.body.symbol,
//     req.body.name,
//     req.body.price,
//     req.body.amount,
//   ];
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding listing:", err);
//       return res.status(500).json({ error: "Failed to add listing" + err });
//     }
//     res.status(201).json({ success: "Successfully added listing" });
//   });
// };



// exports.getListingById = (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM stock_listing WHERE id=?";
//   db.query(sql, [id], (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json(result);
//   });
// };

// exports.updateListing = (req, res) => {
//   const id = req.params.id;
//   const sql =
//     "UPDATE stock_listing SET `symbol`=?, `name`=?, `price`=?, `in_stock_amount`=? WHERE id=?";
//   const values = [
//     req.body.symbol,
//     req.body.name,
//     req.body.price,
//     req.body.in_stock_amount,
//     id,
//   ];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json({ success: "succefully deleted" });
//   });
// };

// exports.deleteListing = (req, res) => {
//   const id = req.params.id;
//   const sql = "DELETE FROM stock_listing WHERE id=?";
//   db.query(sql, [id], (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json({ success: "succefully deleted" });
//   });
// };
