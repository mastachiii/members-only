const express = require("express");
const controller = require("../controllers/messageController");
const authenticate = require("./authMiddleware");

const router = express.Router();

router.use(authenticate.isAuth);

router.post("/", controller.addMessage);

module.exports = router;
