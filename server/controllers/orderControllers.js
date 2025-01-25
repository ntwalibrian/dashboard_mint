const db = require("../db/db");
const processDirectBuy = require("../services/processDirectBuy");

exports.postDirectBuy = async (req, res) => {
  try {
    if (!req.body.user_id) {
        return res.status(400).json({error: "missing user id"})
    }

    const balanceResults = await db.query(
      "SELECT balance FROM users WHERE id = $1",
      [req.body.user_id]
    );
    const userBalance = balanceResults.rows[0].balance;
    const totalPrice = req.body.quantity * req.body.limit_price;
    if (userBalance < totalPrice) {
      return res.status(400).json({ error: "insuficient balance" });
    }
    const query = `INSERT INTO buy_order ("user_id","stock_id","quantity","limit_price","status","order_type")
                  VALUES($1,$2,$3,$4,'pending','direct')
                  RETURNING *`;
    const values = [
      req.body.user_id,
      req.body.stock_id,
      req.body.quantity,
      req.body.limit_price,
    ];
    const results = await db.query(query, values);
    await processDirectBuy.processDirectBuy();

    res.status(201).json({ success: "Successful Buy", order: results.rows[0] });
    console.log("Successfully placed buy");
  } catch (err) {
    console.error("Error placing buy order:", err);
    res.status(500).json({ error: "Failed to place buy order", err });
  }
};
