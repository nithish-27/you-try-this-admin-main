const express = require("express");
const app = express();
const router = express();
const PORT = 200;
const pageModel = require("../../model/pageModel");
const axios = require("axios");
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
router.get("/details", async (req, res) => {
  try {
    const response = await axios(
      "https://yts-restapi.onrender.com/purple/v1/jewel/"
    );
    const jewelryData = response.data.Jewellery_details;
    console.log(jewelryData);
    res.render("../views/Jwell/Jwell-detail", { jewelryData });
  } catch (error) {
    console.log(error);
  }
});
router.get("/bannerdetails", async (req, res) => {
  try {
    const response = await axios(
      "https://yts-restapi.onrender.com/purple/v1/banner/"
    );
    const bannerData = response.data.Banner_details;
    console.log(bannerData);
    res.render("../views/Banner/banners-detail", { bannerData });
  } catch (error) {
    console.log(error);
  }
});
router.get("/newsdetails", async (req, res) => {
  try {
    const response = await axios(
      "https://yts-restapi.onrender.com/purple/v1/newsfeed/"
    );
    const newsfeedData = response.data.newsfeed_details;
    console.log(newsfeedData);
    res.render("../views/Newsfeed/Newsfeed-detail", { newsfeedData });
  } catch (error) {
    console.log(error);
  }
});
router.get("/jwell/edit/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const response = await axios(
      `https://yts-restapi.onrender.com/purple/v1/jewel/${id}`
    );
    const jewellData = response.data.Jewellery_details;
    console.log(jewellData);
    res.render("../views/jwell/jwell-edit", { jewellData });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
