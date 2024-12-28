const db = require("../db/query");

function addMessage(req, res) {
    console.log(req.body);
}

module.exports = {
    addMessage,
};
