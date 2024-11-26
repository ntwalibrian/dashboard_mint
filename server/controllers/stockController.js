const db = require("../db/db");

exports.getListing = (req, res) => {
  const sql = "SELECT * FROM stock_listing";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "error ocured" + err });
    return res.json(result);
  });
};


exports.getListingById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM stock_listing WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "error ocured" + err });
    return res.json(result);
  });
};

exports.addListing = (req, res) => {
  const sql =
    "INSERT INTO stock_listing (`symbol`, `name`, `price`, `in_stock_amount`) VALUES(?,?,?,?)";
  const values = [
    req.body.symbol,
    req.body.name,
    req.body.price,
    req.body.amount,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding listing:", err);
      return res.status(500).json({ error: "Failed to add listing" + err });
    }
    res.status(201).json({ success: "Successfully added listing" });
  });
};

exports.updateListing = (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE stock_listing SET `symbol`=?, `name`=?, `price`=?, `in_stock_amount`=? WHERE id=?";
  const values = [
    req.body.symbol,
    req.body.name,
    req.body.price,
    req.body.in_stock_amount,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ message: "error ocured" + err });
    return res.json({ success: "succefully deleted" });
  });
};

exports.deleteListing = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM stock_listing WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "error ocured" + err });
    return res.json({ success: "succefully deleted" });
  });
};

