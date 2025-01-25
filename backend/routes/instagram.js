const express = require("express");
const router = express.Router();
const instagramController = require("../controllers/instagramController");

router.post("/scrape", instagramController.scrape);

module.exports = router;
