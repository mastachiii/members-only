const express = require("express");
const controller = require("../controllers/logInController");
const passport = require("passport");
const autheticate = require("./authMiddleware");

const router = express.Router();

// GET
router.get("/log-in", controller.getLogInForm);

// POST
router.post(
    "/log-in",
    passport.authenticate("local", {
        failureRedirect: "/log-in",
        failureMessage: true,
    }),
    controller.logInUser
);

router.post("/log-out", controller.logOutUser);

module.exports = router;
