const express = require("express");

const controller = require("../controllers/signUpController");

const router = express.Router();

// GET
router.get("/", controller.getSignUpForm);

// POST
router.post("/", controller.addNewUser);

module.exports = router;
