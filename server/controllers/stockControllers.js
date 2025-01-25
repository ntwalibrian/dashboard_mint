const db = require("../db/db");

exports.get_portfolio = (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    return res.status(400).json({ error: "user_id required" });
  }
  const query = `
  SELECT
    user_stock_holdings.quantity,
    user_stock_holdings.price,
    user_stock_holdings.holding_id,
    stocks.symbol,
    stocks.company_name,
    stocks.total_supply,
    stocks.logo,
    stocks.current_price
  FROM user_stock_holdings  
  JOIN stocks ON user_stock_holdings.stock_id = stocks.id 
  WHERE user_stock_holdings.user_id = $1;
    `;
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error occurred: " + err });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Portfolio not found"})
    }
    return res.json(results);
  });
};
