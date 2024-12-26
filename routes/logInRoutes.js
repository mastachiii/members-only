const express = require("express");
const controller = require("../controllers/logInController");
const passport = require("passport");

const router = express.Router();

// GET
router.get("/", controller.getLogInForm);

// POST
router.post("/", passport.authenticate("local"), controller.logInUser);

module.exports = router;
