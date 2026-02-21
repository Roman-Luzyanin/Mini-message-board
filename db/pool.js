const { Pool } = require('pg');
const connect = process.env.MESSAGES_DB;

module.exports = new Pool({
    connectionString: connect
})