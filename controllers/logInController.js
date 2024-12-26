const express = require("express");
const db = require("../db/query");

function getLogInForm(req, res) {
    console.log(req);
    res.render("logInForm");
}

function logInUser(req, res) {
    console.log(req);
    res.send("<h1>You are logged in!</h1>");
}

module.exports = {
    getLogInForm,
    logInUser,
};
