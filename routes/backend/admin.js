let express = require("express");
let router = express();
const axios = require("axios");
//Routes
async function fetchCountsFromExternalAPI() {
  try {
    const jewels = await axios.get(
      "https://yts-restapi.onrender.com/purple/v1/jewel/"
    );

    const newsfeeds = await axios.get(
      "https://yts-restapi.onrender.com/purple/v1/newsfeed/"
    );
    const banners = await axios.get(
      "https://yts-restapi.onrender.com/purple/v1/banner/"
    );
    const users = await axios.get(
      "https://yts-restapi.onrender.com/purple/v1/user/get/"
    );
    const counts = {
      jewels: jewels.data.Jewellery_details.length,
      newsfeeds: newsfeeds.data.newsfeed_details.length,
      banners: banners.data.Banner_details.length,
      users: users.data.userCount,
    };
    console.log(counts);
    return counts;
  } catch (error) {
    console.error(error);
    return {
      jewels: "Loading...",
      newsfeeds: "Loading...",
      banners: "Loading...",
      // users: users.length,
    };
  }
}
router.get("/", async (req, res) => {
  const counts = await fetchCountsFromExternalAPI();

  res.render("../views/index", { counts });
});

module.exports = router;
