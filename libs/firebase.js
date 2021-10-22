const { initializeApp, cert } = require("firebase-admin/app");
require("dotenv").config();
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const admin = initializeApp({
  credential: cert(serviceAccount),
});

module.exports = admin;
