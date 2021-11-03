const express = require("express");
const router = express.Router();

router.post("/auth/register", async (req, res, next) => {
  try {
    const { email, password, displayName = null } = req.body;
    const data = await auth.createUser({ email, password, displayName });
    res.json({ data });
  } catch (error) {
    if (error.errorInfo) {
      return res.status(400).json(error.errorInfo);
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
