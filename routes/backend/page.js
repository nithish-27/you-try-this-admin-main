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
// Edit Jwell Page
router.get("/jwell/edit/:id", async (req, res) => {
  // Retrieve the ID from the URL parameter and use it to fetch the data to edit.
  try {
    const itemId = req.params.id;

    // Send a request to the API to fetch the data by ID
    const response = await axios.get(
      `https://yts-restapi.onrender.com/purple/v1/jewel/${itemId}`
    );
    const jwellData = response.data.Jewellery_details;
    console.log(jwellData);
    // const escapedOccasion = JSON.stringify(jwellData.occasion).replace(
    //   /&/g,
    //   "\\u0026"
    // );
    // Render an edit form with the retrieved data.
    res.render("../views/Jwell/jwell-edit", { jwellData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit Banners Page
router.get("/banners/edit/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Send a request to the API to fetch the data by ID
    const response = await axios.get(
      `https://yts-restapi.onrender.com/purple/v1/banner/${itemId}`
    );
    const bannerDatadetails = response.data.banner_details;

    // Render an edit form with the retrieved data.
    res.render("../views/Banner/Banners-edit", { bannerDatadetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
  // Fetch the data for editing and render an edit form.
});

// Edit Newsfeed Page
router.get("/newsfeed/edit/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Send a request to the API to fetch the data by ID
    const response = await axios.get(
      `https://yts-restapi.onrender.com/purple/v1/newsfeed/${itemId}`
    );
    const newsfeedDatadetails = response.data.newsfeed_details;

    // Render an edit form with the retrieved data.
    res.render("../views/Newsfeed/Newsfeed-edit", {
      newsfeedDatadetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
  // Fetch the data for editing and render an edit form.
});

// success message
// router.get("/jwell/success", (req, res) => {
//   res.render("../views/Jwell/jwell");
// });

module.exports = router;
