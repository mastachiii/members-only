const db = require("../db/query");
const { body, validationResult } = require("express-validator");

// Form validation
const titleMessage = "The title may not be longer than 255 characters.";
const bodyMessage = "The message may not be longer than 10,000 characters."; // Error message for the message itself.

const validateForm = [
    body("title").trim().notEmpty().withMessage("Title is required.").isLength({ max: 255 }).withMessage(titleMessage),
    body("message").trim().notEmpty().withMessage("Message is required.").isLength({ max: 10000 }).withMessage(bodyMessage),
];

const addMessage = [
    validateForm,
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) res.json({ errors: errors.array() });

        const { title, message } = req.body;
        const username = req.user.username;
        const pfpUrl = req.user.pfp_url;
        const date = new Date().toUTCString();

        await db.addMessage({ title, message, username, date });
        res.redirect("/");
    },
];

async function deleteMessage(req, res, next) {
    try {
        await db.deleteMessage(req.params.id);

        res.redirect("/homepage");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addMessage,
    deleteMessage,
};
