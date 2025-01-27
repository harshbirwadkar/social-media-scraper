// const express = require("express");
// const router = express.Router();
// const youtubeController = require("../controllers/youtubeController");


// router.post("/scrape", youtubeController.scrape);

// module.exports = router;


const express = require("express");
const router = express.Router();
const youtubeController = require("../controllers/youtubeController");

router.post("/scrape", youtubeController.scrape);

module.exports = router;
