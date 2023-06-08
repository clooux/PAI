var express = require("express");
var router = express.Router();

const auctionController = require("../controllers/AuctionController");
const auctionsController = require("../controllers/AuctionsController");
const offerController = require("../controllers/OfferController");

router.get("/", auctionsController.getAuctions);

router.get("/:id", auctionController.getAuction);

router.get("/:id/add-offer", offerController.getOffer);

module.exports = router;
