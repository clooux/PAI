var express = require("express");
var router = express.Router();

const auctionsController = require("../controllers/AuctionsController");
const offerController = require("../controllers/OfferController");

router.get("/", auctionsController.getAuctions);

router.get("/:id", auctionsController.getAuction);

router.get("/:id/add-offer", offerController.getOffer);

router.post("/:id/add-offer", offerController.postOffer);

module.exports = router;
