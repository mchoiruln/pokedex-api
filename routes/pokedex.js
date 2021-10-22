const express = require("express");
const router = express.Router();
const { authCheck, auth } = require("../libs/firebase");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Pokedex" });
});

// auth register
router.post("/auth/register", authCheck, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await auth.createUser({ email, password });
    res.json({ data });
  } catch (error) {
    if (error.errorInfo) {
      return res.status(400).json(error.errorInfo);
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// end auth register

router.get("/protected", authCheck, function (req, res, next) {
  res.json({ title: "Your are authenticated user" });
});

module.exports = router;
