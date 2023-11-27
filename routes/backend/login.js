const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = express.Router();
const axios = require("axios");
const secretKey = crypto.randomBytes(32).toString("hex");
console.log(secretKey);
// Login route
router.get("/", (req, res) => {
  res.render("../views/authentication/login");
});

router.post("/", async (req, res) => {
  // Check if the username and password are valid
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  const data = {
    email: email,
    password: password,
  };
  console.log(data);
  // const response = await axios.get(
  //   "https://yts-restapi.onrender.com/purple/v1/staff/",
  //   data
  // );
  const response = await axios.get(
    "https://yts-restapi.onrender.com/purple/v1/staff/",
    {
      params: data,
    }
  );
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    const user = response.data;

    console.log("user", user);
    // If user details are retrieved successfully, create a JWT token
    const token = jwt.sign({ user }, secretKey, { expiresIn: "5d" });
    console.log("token", token);
    // Set the token as a cookie to remember login state
    res.cookie("token", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // Redirect to /admin after successful login
    res.json({ message: "login sucessfull" });
    // res.redirect("/admin");
  } else {
    // If the response is not successful (e.g., 401 Unauthorized), handle accordingly
    return res
      .status(response.status)
      .json({ message: "Invalid username or password" });
  }
});

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).render("../views/authentication/error-401.ejs");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = decoded.user.Staff_details;
    next();
  });
};

module.exports = { router, authenticateToken };
