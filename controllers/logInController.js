const express = require("express");
const db = require("../db/query");

function getLogInForm(req, res) {
    let error;

    if (req.session.messages) {
        error = req.session.messages[0];
        req.session.messages = []; // Clear out messages so it wont stack
    }

    if (req.user) res.redirect("/logged-in");

    res.render("logInForm", { error });
}

function getLogInIndex(req, res) {
    res.render("indexAuthenticated", { username: req.user.username });
}

function logInUser(req, res) {
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
