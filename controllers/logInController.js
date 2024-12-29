const db = require("../db/query");

function getLogInForm(req, res) {
    let error;

    if (req.session.messages) {
        error = req.session.messages[0];
        req.session.messages = []; // Clear out messages so it wont stack
    }

    if (req.user) res.redirect("/");

    res.render("logInForm", { error });
}

function logInUser(req, res) {
    res.redirect("/");
}

function logOutUser(req, res, next) {
    req.logout(err => {
        if (err) next(err);

        res.redirect("/log-in");
    });
}

module.exports = {
    getLogInForm,
    logInUser,
    logOutUser,
};
