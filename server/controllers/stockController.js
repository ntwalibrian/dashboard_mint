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

exports.getListing = (req, res) => {
  const sql = "SELECT * FROM stocks";
  db1.query(sql, (err, results) => {
    if (err) return res.json({ message: "error ocured" + err });
    return res.json(results);
  });
};

exports.deleteListing = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM stocks WHERE id = $1";
  db1.query(sql, [id], (err, results) => {
    if (err) return res.json({ message: "error ocured" + err });
    return res.json({ success: "succefully deleted" });
  });
};

exports.updateListing = (req, res) => {
  const id = req.params.id;
  const sql = `
    UPDATE stocks
    SET symbol = $1, company_name = $2, current_price = $3, total_supply = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [
    req.body.symbol,
    req.body.company_name,
    req.body.current_price,
    req.body.total_supply,
    id,
  ];

  db1.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Error occurred: " + err });
    }
    return res.json({ success: "Successfully updated" });
  });
};

exports.getListingById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM stocks WHERE id = $1";

  db1.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred: " + err });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.json(results.rows[0]);
  });
};

exports.getPortfolio = (req, res) => {
  const id = req.params.id;
  const sql = `
  SELECT
    
    user_stock_holdings.quantity,
    user_stock_holdings.price,
  

    stocks.symbol,
    stocks.company_name,
    stocks.total_supply,
    stocks.logo,
    stocks.current_price
  FROM user_stock_holdings  
  JOIN stocks ON user_stock_holdings.stock_id = stocks.id 
  WHERE user_stock_holdings.user_id = $1;
    `;
  db1.query(sql,[id],(err,results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred: " + err });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.json(results);
  })
};

