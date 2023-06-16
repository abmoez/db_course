const { Client } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

let client = null;
//let connected = 0;

async function connect() {
  client = new Client({
    connectionString: URL,
    ssl: { rejectUnauthorized: false, sslmode: 'require' }
  });

  try {
    await client.connect();
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
}

async function executeQuery(query) {
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

module.exports = {
  connect,
  executeQuery
};
