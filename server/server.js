const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const db = require("./db/db")
const stockMethods = require("./controllers/stockController")
const authMethods = require("./controllers/authController")
const {scheduleSnapshots} = require("./services/snapshotService")

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 3001;

app.post("/add_listing", stockMethods.addListing)
app.get("/get_listing", stockMethods.getListing )
app.get("/get_listing/:id", stockMethods.getListingById )
app.post("/update_listing/:id", stockMethods.updateListing )
app.delete("/delete_listing/:id", stockMethods.deleteListing)
app.post("/add_user", authMethods.addUser)
app.post("/verify_user", authMethods.verifyUser)
app.get("/get_portfolio/:id", stockMethods.getPortfolio)

scheduleSnapshots();

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "mint",
// });



// app.post("/add_listing", (req, res) => {
//   sql =
//     "INSERT INTO stock_listing (`symbol`, `name`, `price`, `in_stock_amount`) VALUES(?,?,?,?)";
//   const values = [
//     req.body.symbol,
//     req.body.name,
//     req.body.price,
//     req.body.amount,
//   ];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json({ success: "succesfully registered" });
//   });
// });
// app.get("/get_listing", (req, res) => {
//   sql = "SELECT * FROM stock_listing";
//   db.query(sql, (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json(result);
//   });
// });
// app.get("/get_listing/:id", (req, res) => {
//   const id = req.params.id;
//   sql = "SELECT * FROM stock_listing WHERE id=?";
//   const values = [id];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json(result);
//   });
// });
// app.post("/update_listing/:id", (req, res) => {
//   const id = req.params.id;
//   sql =
//     "UPDATE stock_listing SET `symbol`=?, `name`=?, `price`=?, `in_stock_amount`=?  WHERE id=? ";
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
// });
// app.delete("/delete_listing/:id", (req, res) => {
//   const id = req.params.id;
//   sql = "DELETE FROM stock_listing WHERE id=?";

//   const values = [id];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "error ocured" + err });
//     return res.json({ success: "succefully deleted" });
//   });
// });


app.listen(port, () => {
  console.log("on line now now");
});



