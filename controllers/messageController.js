const db = require("../database/queryMessage");

async function getMessages(req, res) {
  try {
    const messages = await db.getMessagesAndUserInfo();
    res.render("index.ejs", {
      title: "Board",
      messages: messages,
      user: req.user,
    });
  } catch (err) {
    console.error("Error occurred while getMessage controller:", err);
  }
}

async function deleteMessage(req, res) {
  try {
    const { id } = req.params;
    await db.deleteMessage(id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error occurred while deleting message in controller:", err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}

module.exports = {
  getMessages,
  deleteMessage,
};
