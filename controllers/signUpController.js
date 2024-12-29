const db = require("../db/query");
const bcrypt = require("bcryptjs");
const randomProfilePic = require("../scripts/randomProfilePicture");
const { body, validationResult } = require("express-validator");

// Form Validation
const emailMessage = "The email you entered seems to be invalid. Please double check it's format";
const passwordMessage = "The password you entered seems to be invalid. Make sure it has atleast 10 characters";

const validateForm = [
    body("fullname").trim().notEmpty().withMessage("Full Name is required."),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage(emailMessage),
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required").isAlphanumeric().isLength({ min: 10 }).withMessage(passwordMessage),
    body("passwordConfirm")
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            return value == req.body.password;
        })
        .withMessage("The password does not match."),
];

function getSignUpForm(req, res) {
    res.render("signUpForm");
}

const addUser = [
    validateForm,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(401).render("signUpForm", { errors: errors.array() });

        bcrypt.hash(req.body.password, 10, async (err, hasedPassword) => {
            if (err) next(err);

            req.body.password = hasedPassword;
            req.body.isAdmin = req.body.isAdmin === '02262006'
            req.body.pfpUrl = randomProfilePic();

            await db.addUser(req.body);
            res.redirect("/log-in");
        });
    },
];

module.exports = {
    getSignUpForm,
    addUser,
};
