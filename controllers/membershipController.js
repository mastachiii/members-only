const db = require("../db/query");

function getMembershipForm(req, res) {
    res.render("membership");
}

function updateMembership(req, res) {
    const { id } = req.user;
    const passcode = req.body.passcode.toLowerCase();

    if (passcode === "tomorrow") {
        db.updateMembership(id);
        res.render("membership", { message: "You are now a member! Feel free to post any messages that you want to share to the group." });
    } else {
        res.render("membership", { message: "Wrong answer, maybe take a break and try again tomorrow?" });
    }
}

module.exports = {
    getMembershipForm,
    updateMembership,
};
