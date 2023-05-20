var express = require("express");
var router = express.Router();

const completedController = require("../controllers/CompletedController");

router.get("/", completedController.getCompleted);

module.exports = router;
