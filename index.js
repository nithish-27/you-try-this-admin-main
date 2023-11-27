const express = require("express");
const app = express();
// const mongoose = require('mongoose')
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
app.use(express.json());
dotenv.config({ path: "./config/.env" });

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const {
  router: loginRouter,
  authenticateToken,
} = require("./routes/backend/login");
const {
  router: logoutRouter,
  
} = require("./routes/backend/logout");
//Routes

// mongoose.connect(process.env.mongoUrl);

const admin = require("./routes/backend/admin");
const page = require("./routes/backend/page");
// const login = require("./routes/backend/login");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  console.log(req.body);
  console.log(req.body.password);
  res.send("This is frontend Page");
});

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/admin", authenticateToken, admin);
app.use("/admin/upload", authenticateToken, page);
app.use("/admin/viewdetails", authenticateToken, page);
app.use((req, res) => {
  res.status(404).render("authentication/error-404.ejs");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
