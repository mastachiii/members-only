const db = require("./pool");

async function addUser({ fullname, email, username, password, isAdmin, pfpUrl }) {
    await db.query("INSERT INTO users (fullname, email, username, password, is_admin, pfp_url,is_member) VALUES ($1, $2, $3, $4, $5, $6, FALSE)", [
        fullname,
        email,
        username,
        password,
        isAdmin,
        pfpUrl,
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

async function getAllMessages() {
    const { rows } = await db.query(
        `SELECT * FROM messages 
        INNER JOIN users
        ON users.username = messages.username
        ORDER BY messages.id DESC`
    );

    console.log(rows);

    return rows;
}

async function addMessage({ date, username, title, message }) {
    await db.query("INSERT INTO messages (date, username, title, message) VALUES ($1, $2, $3, $4)", [date, username, title, message]);
}

function deleteMessage(id) {
    db.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
    addUser,
    getUserByUsername,
    getUserById,
    updateMembership,
    addMessage,
    getAllMessages,
    deleteMessage,
};
