var express = require("express");
var router = express.Router();

const auctionsController = require("../controllers/auctionsController");

router.get("/", auctionsController.getAuctions);

module.exports = router;
