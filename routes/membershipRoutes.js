const express = require("express");
const controller = require("../controllers/membershipController");
const authenticate = require("./authMiddleware");

const router = express.Router();

router.use(authenticate.isAuth);

// GET
router.get("/", controller.getMembershipForm);

// POST
router.post("/", controller.updateMembership);

module.exports = router;
