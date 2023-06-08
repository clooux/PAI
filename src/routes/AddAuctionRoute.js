var express = require("express");
var router = express.Router();

const auctionsController = require("../controllers/AuctionsController");

router.get("/", auctionsController.addAuction);

module.exports = router;
