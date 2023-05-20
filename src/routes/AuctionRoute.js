var express = require("express");
var router = express.Router();

const auctionController = require("../controllers/AuctionController");

router.get("/", auctionController.getAuction);

router.get("/add", auctionController.getAddAuction);

module.exports = router;
