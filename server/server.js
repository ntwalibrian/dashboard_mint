const express = require("express");
const cors = require("cors");
const path = require("path");
const authControllers = require("./controllers/authControllers");


const app = express();
app.use(express.static(path.join(__dirname, "public")));   
app.use(cors());
app.use(express.json()); 



app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "banana", "cherry"] });
});
app.get("/api/users", authControllers.getUsers);
app.post("/verify_user", authControllers.validateUser)



app.listen(8080, () => {
  console.log("on line now now on port 8080");
});
