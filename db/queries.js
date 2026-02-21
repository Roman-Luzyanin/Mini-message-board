const pool = require('./pool');

async function getAllMesages() {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY id');
    return rows;
}

async function getMesage(m_id) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [m_id]);
    return rows[0];
}

async function insertMessage(u_name, u_text) {
    await pool.query('INSERT INTO messages (name, text) VALUES ($1, $2)', [u_name, u_text]);
}

async function deleteMessage(u_id) {
    await pool.query('DELETE FROM messages WHERE id = $1', [u_id]);
}

async function updateMessage(u_id, u_text) {
    await pool.query('UPDATE messages SET text = $1 WHERE id = $2', [u_text, u_id]);
}

module.exports = {
    getAllMesages,
    getMesage,
    insertMessage,
    deleteMessage,
    updateMessage,
}