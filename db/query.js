const db = require("./pool");

async function addUser({ fullname, email, username, password }) {
    await db.query("INSERT INTO users (fullname, email, username, password, is_member) VALUES ($1, $2, $3, $4, FALSE)", [
        fullname,
        email,
        username,
        password,
    ]);
}

module.exports = {
    addUser,
};
