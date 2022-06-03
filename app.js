const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// set up rate limiter: maximum of five requests per minute
var RateLimit = require("express-rate-limit");
var limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
});

// apply rate limiter to all requests
const indexRouter = require("./routes/index");
const pokedexRouter = require("./routes/pokedex");
const authRouter = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("static", express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api", pokedexRouter);
app.use("/", indexRouter);

module.exports = app;
