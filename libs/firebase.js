const { initializeApp, cert, App } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

require("dotenv").config();
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const app = initializeApp({
  credential: cert(serviceAccount),
});

const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    await getAuth(app).verifyIdToken(token);

    return next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Not Authorized" });
  }
};

module.exports = app;
module.exports.authCheck = authCheck;
