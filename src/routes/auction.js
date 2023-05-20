var express = require("express");
var router = express.Router();

const auctionController = require("../controllers/auctionController");

router.get("/", auctionController.getAuction);

router.get("/add", auctionController.getAuction);

module.exports = router;
