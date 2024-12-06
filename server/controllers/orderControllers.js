const db1 = require("../db/db");

exports.postBuyOrder = (req, res) => {
  const sql = `INSERT INTO buy_order ("user_id","stock_id","quantity","limit_price","status")
    VALUES($1,$2,$3,$4,'pending')
    RETURNING *`;
  const values = [
    req.body.user_id,
    req.body.stock_id,
    req.body.quantity,
    req.body.limit_price,
  ];
  db1.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error adding listing:", err);
      return res.status(500).json({ error: "Failed to add listing" + err });
    }
    res.status(201).json({ success: "Successfully added listing" });
    console.log("successfully placed buy");
  });
};

exports.updateBuyOrder = (req, res) => {
  const id = req.params.id;
  const sql = `
    UPDATE buy_order
    SET quantity = $1, limit_price = $2
    WHERE order_id = $3
    RETURNING *;
  `;
  const values = [req.body.quantity, req.body.limit_price, id];
  db1.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error adding listing:", err);
      return res.status(500).json({ error: "Failed to add listing" + err });
    }
    res.status(201).json({ success: "Successfully added listing" });
    console.log("successfully placed buy");
  });
};
