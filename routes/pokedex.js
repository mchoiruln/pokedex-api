const express = require("express");
const router = express.Router();
const { authCheck } = require("../libs/firebase");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Pokedex" });
});

router.get("/protected", authCheck, function (req, res, next) {
  res.json({ title: "Your are authenticated user" });
});

module.exports = router;
