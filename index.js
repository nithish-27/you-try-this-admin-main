const express = require("express");
const app = express();
// const mongoose = require('mongoose')
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config/.env" });

// mongoose.connect(process.env.mongoUrl);

const admin = require("./routes/backend/admin");
const page = require("./routes/backend/page");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.send("This is frontend Page");
});
app.use("/admin", admin);
app.use("/admin/upload", page);
app.use("/admin/viewdetails", page);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});