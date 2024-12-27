const express = require("express");
const controller = require("../controllers/membershipController");

const router = express.Router();

// GET
router.get("/secret", controller.getMembershipForm);

// POST
router.post("/secret", controller.updateMembership);

module.exports = router;
