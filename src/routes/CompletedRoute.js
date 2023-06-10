var express = require("express");
var router = express.Router();

const completedController = require("../controllers/CompletedController");

router.get("/", completedController.getCompletedAuctions);

router.get("/:id", completedController.getCompletedAuction);

module.exports = router;
