var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dotenv = require("dotenv").config();

var indexRouter = require("./src/routes/IndexRoute");
var auctionsRouter = require("./src/routes/AuctionsRoute");
var completedRouter = require("./src/routes/CompletedRoute");
var addAuctionRouter = require("./src/routes/AddAuctionRoute");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auctions", auctionsRouter);
app.use("/completed", completedRouter);
app.use("/add-auction", addAuctionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
