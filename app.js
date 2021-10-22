const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const pokedexRouter = require("./routes/pokedex");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("static", express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", pokedexRouter);
app.use("/", indexRouter);

module.exports = app;
