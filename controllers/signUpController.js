const express = require("express");
const db = require("../db/query");
const bcrypt = require("bcryptjs");
const { body, header, validationResult } = require("express-validator");

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
            console.log(value, req.body.password);
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
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        bcrypt.hash(req.body.password, 10, async (err, hasedPassword) => {
            if (err) next(err);

            req.body.password = hasedPassword;

            await db.addUser(req.body);
            res.redirect("/");
        });
    },
];

module.exports = {
    getSignUpForm,
    addUser,
};