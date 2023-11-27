const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("token"); // Clear the 'token' cookie
  res.redirect("/login"); // Redirect to the login page
});
module.exports = { router };
