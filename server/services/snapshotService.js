const db1 = require("../db/db");
const schedule = require("node-schedule");

const generateSnapshot = async () => {
  try {
    const query = `
      INSERT INTO portfolio_snapshot (user_id, total_value, time_stamp)
      SELECT 
          sh.user_id,
          SUM(sh.quantity * s.current_price) AS total_value,
          NOW() AS time_stamp
      FROM 
          user_stock_holdings sh
      JOIN 
          stocks s
      ON 
          sh.stock_id = s.id
      GROUP BY 
          sh.user_id;
    `;
    await db1.query(query);
    console.log("Portfolio snapshots generated successfully!");
  } catch (error) {
    console.error("Error generating portfolio snapshots:", error);
  }
};

exports.scheduleSnapshots = () => {
  schedule.scheduleJob("0 12  * * *", async () => {
    console.log("Running scheduled portfolio snapshot generation...");
    await generateSnapshot();
  });
};
