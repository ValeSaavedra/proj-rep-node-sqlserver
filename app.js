//var createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { engine } = require("express-handlebars");
const dotenv = require("dotenv");
dotenv.config();

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const reportes = require("./routes/reportes");

const app = express();

// view engine setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use("/reportes", reportes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendStatus(400);
});

// error handler
app.use(function (err, req, res, next) {
  res.sendStatus(599);
});

module.exports = app;
