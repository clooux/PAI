var express = require("express");
var router = express.Router();

const completedController = require("../controllers/completedController");

router.get("/", completedController.getCompleted);

module.exports = router;
