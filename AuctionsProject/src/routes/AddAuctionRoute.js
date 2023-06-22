var express = require("express");
var router = express.Router();

const auctionsController = require("../controllers/AuctionsController");

router.get("/", auctionsController.getAddAuction);

router.post("/", auctionsController.postAddAuction);

module.exports = router;
