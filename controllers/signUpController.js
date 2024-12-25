const express = require("express");

function getSignUpForm(req, res) {
    res.render("signUpForm");
}

module.exports = {
    getSignUpForm,
};
