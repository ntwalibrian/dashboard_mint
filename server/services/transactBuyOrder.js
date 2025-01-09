const db1 = require("../db/db");

const processPendingBuyOrders = async () => {
  try {
    console.log("Processing pending buy orders...");
    const pendingOrders = await db1.query(
      "SELECT * FROM buy_order WHERE status = 'pending'"
    );
    console.log(pendingOrders.rows)
    for (const order of pendingOrders.rows) {
      try {
        await db1.query("BEGIN");

        const {
          user_id,
          stock_id,
          quantity,
          limit_price,
          order_id,
        } = order; 
        const totalPrice = quantity * limit_price;
        const balanceResult = await db1.query(
          "UPDATE users SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance",
          [totalPrice, user_id]
        );
        if (!balanceResult.rows.length) {
          throw new Error(`Insufficient balance for user_id ${user_id}`);
        }
        //updatte price latter
        await db1.query(
          `INSERT INTO user_stock_holdings (user_id, stock_id, quantity, price)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (user_id, stock_id)
                     DO UPDATE SET quantity = user_stock_holdings.quantity + $3`,
          [user_id, stock_id, quantity, limit_price]
        );

        await db1.query(
          "UPDATE buy_order SET status = 'completed' WHERE order_id = $1",
          [order_id]
        );

        await db1.query("COMMIT");
        console.log(`Order ${order_id} processed successfully.`);
      } catch (err) {
        await db1.query("ROLLBACK");
        console.error(`Failed to process order ${order.id}:`, err.message);

        await db1.query(
          "UPDATE buy_order SET status = 'failed' WHERE order_id = $1",
          [order.id]
        );
      }
    }
  } catch (err) {
    console.error("Error processing buy orders:", err.message);
  }
};

module.exports = { processPendingBuyOrders };
