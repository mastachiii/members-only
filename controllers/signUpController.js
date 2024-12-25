const express = require("express");
const { body, header, validationResult } = require("express-validator");

// Form Validation
const emailMessage = "The email you entered seems to be invalid. Please double check it's format";
const passwordMessage = "The password you entered seems to be invalid. Make sure it has atleast 10 characters and has both numbers & letters";

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

const addNewUser = [
    validateForm,
    (req, res) => {
        const errors = validationResult(req);

        console.log(errors);
    },
];

module.exports = {
    getSignUpForm,
    addNewUser,
};
