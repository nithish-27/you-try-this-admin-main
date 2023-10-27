const express = require("express");
const app = express();
const router = express();
const PORT = 200;
const pageModel = require("../../model/pageModel");

//Routes
router.get("/jwell", (req, res) => {
  res.render("../views/Jwell/jwell");
});
// Collecting dataa
router.post("/jwell", (req, res) => {
  pageModel.create({
    name: req.body.name,
  });
});

router.get("/banners", (req, res) => {
  res.render("../views/Banner/banners");
});
router.get("/newsfeed", (req, res) => {
  res.render("../views/Newsfeed/newsfeed");
});
router.get("/details", (req, res) => {
  res.render("../views/Jwell/Jwell-detail");
});
router.get("/bannerdetails", (req, res) => {
  res.render("../views/Banner/banners-detail");
});
router.get("/newsdetails", (req, res) => {
  res.render("../views/Newsfeed/Newsfeed-detail");
});

module.exports = router;
