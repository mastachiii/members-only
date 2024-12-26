const express = require("express");
const db = require("../db/query");

function getLogInForm(req, res) {
    res.render("logInForm");
}

function getLogInIndex(req, res) {
    res.render("indexAuthenticated", { user: req.user.username });
}

function logInUser(req, res) {
    console.log(req);
    res.redirect("/logged-in");
}

function logOutUser(req, res, next) {
    req.logout(err => {
        if (err) next(err);

        res.redirect("/sign-up");
    });
}

module.exports = {
    getLogInForm,
    logInUser,
    logOutUser,
    getLogInIndex,
};
