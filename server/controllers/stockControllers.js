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
      return res.status(404).json({ error: "Portfolio not found" });
    }
    return res.json(results);
  });
};

exports.get_balance = (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    return res.status(400).json({ error: "user_id required" });
  }
  const query = `
  SELECT balance
  FROM users
  WHERE id = $1;
  `;
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error occurred: " + err });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ balance: results.rows[0].balance });
  });
};

exports.get_wishlist = (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    return res.status(400).json({ error: "user_id required" });
  }
  const query = `
  SELECT 
    wishlist.user_id,
    stocks.company_name,
    stocks.logo,
    stocks.symbol,
    stocks.current_price
  FROM wishlist 
  JOIN stocks ON wishlist.stock_id = stocks.id
  WHERE wishlist.user_id = $1
    `;
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error occurred: " + err });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "No wishlist items found" });
    }
    return res.json(results);
  });
};

exports.get_listings = (req, res) => {
  const query = `
  SELECT * FROM stocks
    `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error occurred: " + err });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "no Listings not found" });
    }
    return res.json(results);
  });
};



exports.add_to_wishlist = (req, res) => {
  const stock_id = req.body.stock_id;
  const user_id = req.body.user_id;

  if (!stock_id || !user_id) {
    return res.status(400).json({ error: "missing user id or stock id" });
  }

  const checkQuery = `
    SELECT * FROM wishlist
    WHERE stock_id = $1 AND user_id = $2
  `;
  const checkValues = [stock_id, user_id];

  db.query(checkQuery, checkValues, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Error occurred: "});
    }
    if (results.rows.length > 0) {
      const deleteQuery = `
        DELETE FROM wishlist
        WHERE stock_id = $1 AND user_id = $2
        RETURNING *
      `;
      db.query(deleteQuery, checkValues, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Error occurred: " + err });
        }
        return res.status(200).json({
          success: "Stock removed from wishlist",
          user: results.rows[0],
        });
      });
    } else {
      const insertQuery = `
        INSERT INTO wishlist ("stock_id", "user_id")
        VALUES ($1, $2)
        RETURNING *
      `;
      const insertValues = [stock_id, user_id];

      db.query(insertQuery, insertValues, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Error occurred: " + err });
        }
        return res.status(201).json({
          success: "Stock added to wishlist",
          user: results.rows[0],
        });
      });
    }
  });
};
