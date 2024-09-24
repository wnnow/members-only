const pgPool = require("./pool");

async function insertUser(firstName, lastName, username, password) {
  try {
    await pgPool.query(
      `INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1,$2,$3,$4)`,
      [firstName, lastName, username, password]
    );
  } catch (err) {
    console.error("Error occur while insert user: ", err);
  }
}

async function updateUsersMembership(params) {}
async function testQuery() {
  try {
    // Query the information_schema to get the list of tables
    const queryText = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    const { rows } = await pgPool.query(queryText);
    console.log("Tables in the database:", rows);
    return rows;
  } catch (err) {
    console.error("Error occurred while querying the database:", err);
  } finally {
    await pgPool.end(); // Close the connection pool
  }
}

async function getUser(username) {
  try {
    const { rows } = await pgPool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    return rows[0];
  } catch (err) {
    console.error("Error occurred while query user", err);
  }
}
module.exports = {
  insertUser,
  getUser,
};
