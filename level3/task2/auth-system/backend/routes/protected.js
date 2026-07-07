const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET /api/protected/dashboard - example of a route that requires a valid login.
// Any route that should only be visible to logged-in users follows this same
// pattern: add requireAuth as middleware before the handler.
router.get("/dashboard", requireAuth, (req, res) => {
  res.json({
    message: "This data is only visible to logged-in users.",
    userId: req.user.id,
    servedAt: new Date().toISOString(),
  });
});

module.exports = router;
