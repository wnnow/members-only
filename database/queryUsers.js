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

async function updateMembership(id, membershipResult) {
  try {
    await pgPool.query(
      `
      UPDATE users
      SET membership_status = $2
      WHERE id = $1`,
      [id, membershipResult]
    );
  } catch (err) {
    console.error("Error occurred while updateMembership controller: ", err);
  }
}

async function updateAdmin(id, adminResult) {
  try {
    await pgPool.query(
      `
      UPDATE users
      SET is_admin = $2
      WHERE id = $1`,
      [id, adminResult]
    );
  } catch (err) {
    console.error("Error occurred while updateMembership controller: ", err);
  }
}
module.exports = {
  insertUser,
  getUser,
  updateAdmin,
  updateMembership,
};
