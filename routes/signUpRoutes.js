const express = require("express");

const controller = require("../controllers/signUpController");

const router = express.Router();

router.get("/", controller.getSignUpForm);

module.exports = router;
