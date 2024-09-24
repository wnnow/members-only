const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

// async function testQuery() {
//   const { rows } = await pool.query(`SELECT * FROM users`);
//   console.log(rows);
// }

// testQuery();
module.exports = pool;
