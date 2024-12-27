const db = require("./pool");

async function addUser({ fullname, email, username, password }) {
    await db.query("INSERT INTO users (fullname, email, username, password, is_member) VALUES ($1, $2, $3, $4, FALSE)", [
        fullname,
        email,
        username,
        password,
    ]);
}

async function getUserByUsername(username) {
    const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    return rows[0];
}

async function getUserById(id) {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    return rows[0];
}

async function updateMembership(id) {
    await db.query("UPDATE users SET is_member = TRUE WHERE id = $1", [id]);
}

module.exports = {
    addUser,
    getUserByUsername,
    getUserById,
    updateMembership,
};
