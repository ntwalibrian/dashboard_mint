const db1 = require("../db/db");

exports.postBuyOrder = async (req, res) => {
  try {
    const balanceResults = await db1.query(
      "SELECT balance FROM users WHERE id = $1",
      [req.body.user_id]
    );
    const userBalance = balanceResults.rows[0].balance;

    const totalPrice = req.body.quantity * req.body.limit_price;
    if (userBalance >= totalPrice) {
      const sql = `INSERT INTO buy_order ("user_id","stock_id","quantity","limit_price","status")
                  VALUES($1,$2,$3,$4,'pending')
                  RETURNING *`;
      const values = [
        req.body.user_id,
        req.body.stock_id,
        req.body.quantity,
        req.body.limit_price,
      ];
      const results = await db1.query(sql, values);
      res
        .status(201)
        .json({ success: "Successfully added listing", order: results.rows[0] });
      console.log("Successfully placed buy");
    } else {
      res
        .status(400)
        .json({ error: "Insufficient balance to place the buy order" });
      console.log("Insufficient balance to place the buy order");
    }
  } catch (err) {
    console.error("Error placing buy order:", err);
    res.status(500).json({ error: "Failed to place buy order", err });
  }
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
