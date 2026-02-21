const { Client } = require('pg');

const SQL = `
    CREATE TABLE IF NOT EXISTS messages_unformated(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        created_time TIME(0) DEFAULT CURRENT_TIME,
        created_date DATE DEFAULT CURRENT_DATE,
        name VARCHAR (255),
        text TEXT);

    CREATE VIEW messages AS
    SELECT  id, name, text,
            TO_CHAR(created_time, 'HH24:MI') AS time,
            TO_CHAR(created_date, 'DD-MM-YYYY') AS date
    FROM messages_unformated;    

    INSERT INTO messages(name, text) VALUES ('Roman', 'Hello World!');
`;

async function seed() {
    const client = new Client({
        connectionString: 'postgresql://roman:grtb342fs@localhost:5432/messages',
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
}

seed();