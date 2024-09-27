const pgPool = require("./pool");

async function getAllMessage() {
  try {
    const { rows } = await pgPool.query("SELECT * FROM messages");
    return rows;
  } catch (err) {}
}

async function getMessagesAndUserInfo() {
  try {
    const { rows } = await pgPool.query(`SELECT 
    messages.*, 
    users.first_name, 
    users.last_name, 
    users.id AS user_id
FROM 
    messages
JOIN 
    users ON messages.creator_id = users.id;`);

    return rows;
  } catch (err) {
    console.error(
      "Error occurred while getMessagesAndUserInfo controller: ",
      err
    );
  }
}

async function deleteMessage(id) {
  if (id) {
    try {
      await pgPool.query("DELETE FROM messages WHERE id = $1", [id]);
    } catch (err) {
      console.error("Error occurred while delete query message:", err);
    }
  }
}

async function insertMessage(title, text, creator_id) {
  try {
    await pgPool.query(
      `
      INSERT INTO messages (title,text,creator_id)
      VALUES ($1,$2,$3)`,
      [title, text, creator_id]
    );
    console.log(`insert success`);
  } catch (err) {
    console.error("Error occurred while inserting query message:", err);
  }
}

module.exports = {
  getAllMessage,
  getMessagesAndUserInfo,

  deleteMessage,
  insertMessage,
};
