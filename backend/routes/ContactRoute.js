const express = require("express");
const router = express.Router();

console.log("✅ ContactRoute loaded");

router.get("/test", (req, res) => {
  res.send("Contact route is live!");
});

module.exports = router;
